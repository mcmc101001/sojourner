"use client";

import { Loader2, Plus, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Action } from "@prisma/client";
import { addQuestType } from "@/pages/api/addQuest";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);

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
      <div className="w-1/4 h-full flex flex-col items-center justify-center p-2">
        <Utensils className="h-full w-full text-background2 p-1" />
        <span className="text-background2 text-sm font-semibold whitespace-nowrap">
          {points} points
        </span>
      </div>
      <div className="flex flex-col h-full items-center justify-between w-3/4 p-2">
        <span className="text-background2 text-justify">
          {name}
          {action && <Badge className="ml-2">{action}</Badge>}
        </span>
        <span className="mt-3 text-background2 font-semibold text-xs">
          x and x completed this quest!
        </span>
      </div>
      {addable &&
        (isLoading ? (
          <Loader2 className="animate-none w-14" />
        ) : (
          <Plus
            className="w-14 text-background2"
            onClick={() => handleClick()}
          />
        ))}
    </div>
  );
}
