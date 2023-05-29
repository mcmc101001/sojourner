import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import z from "zod";

const addQuestSchema = z.object({
  userId: z.string(),
  name: z.string(),
  points: z.number().int(),
  lat: z.number(),
  lng: z.number(),
  journeyId: z.string(),
});

export type addQuestType = z.infer<typeof addQuestSchema>;

function isValidBody(body: any): body is addQuestType {
  const { success } = addQuestSchema.safeParse(body);
  return success;
}

export default async function addQuest(
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
    let { name, journeyId, points, lat, lng } = req.body;

    const existingQuest = await prisma.quest.findUnique({
      where: {
        lat_lng: {
          lat: lat,
          lng: lng,
        },
      },
    });

    if (existingQuest) {
      const Journalentry = await prisma.questOnJourney.create({
        data: {
          questId: existingQuest.id,
          journeyId: journeyId,
        },
      });
      res.status(200).json(Journalentry);
    } else {
      const Journalentry = await prisma.quest.create({
        data: {
          name: name,
          points: points,
          lat: lat,
          lng: lng,
        },
      });
      const Journalentry2 = await prisma.questOnJourney.create({
        data: {
          questId: Journalentry.id,
          journeyId: journeyId,
        },
      });
      res.status(200).json(Journalentry2);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
