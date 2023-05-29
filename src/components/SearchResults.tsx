"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/Input";
import QuestItem from "./QuestItem";
import { Quest } from "@prisma/client";

type Place = {
  lat: number;
  lng: number;
  name: string;
};

export default function SearchResults({
  journeyId,
  userId,
  allQuests,
}: {
  journeyId: string;
  userId: string;
  allQuests: Quest[];
}) {
  let [searchInput, setSearchInput] = useState("");
  let [filteredQuests, setFilteredQuests] = useState(allQuests);

  // Search radius
  const rad = 4 * 1000;
  // Latitude & Longitude
  let lat: number | undefined;
  let lng: number | undefined;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
    });
  }
  if (lat == undefined || lng == undefined) {
    lat = 1.35;
    lng = 103.8;
  }

  let places: Place[] = [];
  // useEffect(() => {
  //   async function updatePlaces() {
  //     const newPlaces: Place[] = [];
  //     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${rad}$key=${process
  //       .env.NEXTGOOGLE_PLACE_API_KEY!}`;
  //     await fetch(url)
  //       .then((res) => res.json())
  //       .then((json) => {
  //         for (let googlePlace of json.results) {
  //           let place = {
  //             lat: googlePlace.geometry.location.lat,
  //             lng: googlePlace.geometry.location.lng,
  //             name: googlePlace.name,
  //           };
  //           newPlaces.push(place);
  //         }
  //         if (searchInput !== "") {
  //           newPlaces.filter((place) => place.name.includes(searchInput));
  //         }
  //         places = newPlaces;
  //       });
  //   }
  //   updatePlaces();
  //   console.log(places);
  // }, [searchInput]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setFilteredQuests(
      filteredQuests.filter((quest) => quest.name.includes(searchInput))
    );
  };

  return (
    <div className="w-full">
      <Input
        className="w-full py-2 px-4 bg-slate-300 opcaity-80 rounded-full mb-4"
        placeholder={"Add quest"}
        value={searchInput}
        onChange={(e) => handleChange(e)}
      />
      {searchInput !== "" && (
        <div className="w-full h-[50vh] overflow-y-scroll flex flex-col items-center bg-background1 p-2 border-b-2 border-background2">
          {places.map((place) => (
            <QuestItem
              key={place.name}
              action={"PLAY"}
              addable={true}
              journeyId={journeyId}
              lat={place.lat}
              lng={place.lng}
              name={place.name}
              points={2}
              userId={userId}
            />
          ))}
          {filteredQuests.map((quest) => (
            <QuestItem
              key={quest.id}
              action={quest.action}
              addable={true}
              journeyId={journeyId}
              lat={quest.lat}
              lng={quest.lng}
              name={quest.name}
              points={quest.points}
              userId={userId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
