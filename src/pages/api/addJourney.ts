import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import z from "zod";

const addJourneySchema = z.object({
  name: z.string(),
  userId: z.string(),
});

export type addJourneyType = z.infer<typeof addJourneySchema>;

function isValidBody(body: any): body is addJourneyType {
  const { success } = addJourneySchema.safeParse(body);
  return success;
}

export default async function addJourney(
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
    let { name, userId } = req.body;

    const Journalentry = await prisma.journey.create({
      data: {
        name: name,
        createdById: userId,
      },
    });
    res.status(200).json({ Journalentry });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
