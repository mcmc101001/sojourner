"use client";

import { useState } from "react";
import { Input } from "./ui/Input";
import QuestItem from "./QuestItem";

export default function SearchResults({
  journeyId,
  userId,
}: {
  journeyId: string;
  userId: string;
}) {
  let [searchInput, setSearchInput] = useState("");

  return (
    <>
      <Input
        className="w-[80vw] py-2 px-4 bg-primary rounded-full mb-4"
        placeholder={"Search"}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {searchInput !== "" && (
        <div className="w-full h-full flex flex-col items-center bg-background1 p-2 border-b-2 border-background2">
          <QuestItem
            action={"PLAY"}
            addable={true}
            journeyId={journeyId}
            lat={123}
            lng={123}
            name={"eat at rc4 dh"}
            points={2}
            userId={userId}
          />
        </div>
      )}
    </>
  );
}
