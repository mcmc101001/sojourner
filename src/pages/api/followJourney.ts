import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import z from "zod";

const FollowJourneySchema = z.object({
  journeyId: z.string(),
  userId: z.string(),
});

export type FollowJourneyType = z.infer<typeof FollowJourneySchema>;

function isValidBody(body: any): body is FollowJourneyType {
  const { success } = FollowJourneySchema.safeParse(body);
  return success;
}

export default async function FollowJourney(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  if (!isValidBody(req.body)) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  if (session.user.id !== req.body.userId) {
    res.status(401).json({ message: "You are not authorized." });
    return;
  }
  try {
    let { journeyId, userId } = req.body;

    const existingEntry = await prisma.followedJourney.findUnique({
      where: {
        journeyId_userId: {
          journeyId: journeyId,
          userId: userId,
        },
      },
    });

    if (existingEntry) {
      const journalEntry = await prisma.followedJourney.delete({
        where: {
          journeyId_userId: {
            journeyId: journeyId,
            userId: userId,
          },
        },
      });
      res.status(200).json(journalEntry);
    } else {
      const journalEntry = await prisma.followedJourney.create({
        data: {
          journeyId: journeyId,
          userId: userId,
        },
      });
      res.status(200).json(journalEntry);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
