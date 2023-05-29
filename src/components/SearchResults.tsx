"use client";

import { useRef, useEffect, useState } from "react";
import { Input } from "./ui/Input";
import QuestItem from "./QuestItem";

type Place = {
  lat: number,
  lng: number,
  name: string,
  action?: "PLAY" | "SHOP"
}

export default function SearchResults({
  journeyId,
  userId,
}: {
  journeyId: string;
  userId: string;
}) {
  let [searchInput, setSearchInput] = useState("");

  let places: Place[] = [
  {
    lat: 123,
    lng: 123,
    name: "placeholder",
  },

  {
    lat: 123,
    lng: 123,
    name: "sample quest 2",
    action: "SHOP"
  },

  {
    lat: 123,
    lng: 123,
    name: "test",
  },

]

  /*
  // Search radius
  const rad = 4 * 1000
  // Latitude & Longitude
  let lat: number | undefined
  let lng: number | undefined
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude
      lng = position.coords.longitude
    })
  }
  if (lat == undefined || lng == undefined) {
    lat = 1.35
    lng = 103.8
  }

  let key: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!;
  useEffect(() => {
    async function updatePlaces() {
      const newPlaces: Place[] = []
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=${rad}&key=${key}`
      await fetch(url)
        .then(res => res.json())
        .then(json => {
          for (let googlePlace of json.results) {
            let place = {
              lat: googlePlace.geometry.location.lat,
              lng: googlePlace.geometry.location.lng,
              name: googlePlace.name,
            }
            newPlaces.push(place);
          }
          if (searchInput !== "") {
            newPlaces.filter(place => place.name.includes(searchInput))
          }
          places = newPlaces.slice(5)
        })
    }
    updatePlaces()
  }, [searchInput])
  */

  return (
    <div className="w-full">
      <Input
        className="w-full py-2 px-4 bg-slate-300 opcaity-80 rounded-full mb-4"
        placeholder={"Add quest"}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {searchInput !== "" && (
        <div className="w-full h-full flex flex-col items-center bg-background1 p-2 border-b-2 border-background2">
          {places
          .filter(place => place.name.includes(searchInput))
          .map(place =>
            <QuestItem
              action={place.action ? place.action : "PLAY"}
              addable={true}
              journeyId={journeyId}
              lat={place.lat}
              lng={place.lng}
              name={place.name}
              points={2}
              userId={userId}
            />
          )}
        </div>
      )}
    </div>
  );
}