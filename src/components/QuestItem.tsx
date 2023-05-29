"use client";

import { Plus, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Action } from "@prisma/client";
import { addQuestType } from "@/pages/api/addQuest";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function QuestItem({
  journeyId,
  name,
  points,
  action,
  addable,
  lat,
  lng,
  userId,
}: {
  journeyId: string;
  addable: boolean;
  name: string;
  points: number;
  action: Action | null;
  lat: number;
  lng: number;
  userId: string;
}) {
  let router = useRouter();

  const handleClick = async () => {
    let data: addQuestType = {
      userId: userId,
      journeyId: journeyId,
      name: name,
      points: points,
      lat: lat,
      lng: lng,
    };

    try {
      await axios.post("/api/addQuest", data);
    } catch (error) {
      console.log(error);
    }
    router.refresh();
  };

  return (
    <div className="flex items-center justify-center w-full rounded-lg border-2 border-background2 bg-background1">
      <div className="w-1/5 flex items-center justify-center p-2">
        <Utensils className="h-full w-full text-background2" />
      </div>
      <div className="flex flex-col items-center justify-center w-4/5 p-2">
        <span className="text-background2 text-justify">
          {name}
          {action && <Badge className="ml-2">{action}</Badge>}
        </span>
        <span className="text-background2 font-semibold">{points} points</span>
        <span className="text-background2 font-semibold">
          x and x completed this quest!
        </span>
      </div>
      {addable && (
        <Plus className="w-14 text-background2" onClick={() => handleClick()} />
      )}
    </div>
  );
}
