import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import z from "zod";

const StartJourneySchema = z.object({
  journeyId: z.string(),
  userId: z.string(),
});

export type StartJourneyType = z.infer<typeof StartJourneySchema>;

function isValidBody(body: any): body is StartJourneyType {
  const { success } = StartJourneySchema.safeParse(body);
  return success;
}

export default async function StartJourney(
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

    const Journalentry = await prisma.currentJourney.create({
      data: {
        userId: userId,
        journeyId: journeyId,
      },
    });
    res.status(200).json(Journalentry);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
