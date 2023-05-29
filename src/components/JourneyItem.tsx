import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";
import { ChevronRight } from "lucide-react";

export default async function JourneyItem({
  journeyId,
  showPicture = false,
}: {
  journeyId: string;
  showPicture?: boolean;
}) {
  const journey = await prisma.journey.findUnique({
    where: {
      id: journeyId,
    },
    include: {
      createdBy: true,
    },
  });

  if (!journey) return <div>Not found</div>;

  return (
    <div className="w-full pt-2 max-h-max bg-background1 flex-col flex items-center rounded-lg border-2 border-background2">
      <div className="flex mx-4">
        {showPicture && (
          <div className="flex flex-col items-center gap-y-0 w-1/4">
            <Image
              src={journey.createdBy.image!}
              alt="profile pic"
              width={80}
              height={80}
            />
            <span className="text-sm hover:text-underline opacity-80">
              <Link href={`/profile/${journey.createdById}`}>
                {journey.createdBy.name}
              </Link>
            </span>
          </div>
        )}
        <div
          className={
            "flex flex-col gap-y-2 px-2" +
            (showPicture ? "w-3/4" : "w-full justify-center")
          }
        >
          <h1 className="font-semibold text-2xl text-background2 text-center">
            {journey?.name}
          </h1>
          <h2 className="font-semibold text-base text-center opacity-90 text-background2">
            Posted on:{" "}
            {journey.createdAt.toLocaleString("en-GB", {
              minute: "2-digit",
              hour: "2-digit",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </h2>
        </div>
      </div>

      <div className="w-full h-full flex flex-col items-center bg-background1 mt-2 py-2 px-4">
        <div className="flex w-full items-center justify-center gap-x-6">
          <div className="flex flex-1 w-full flex-col items-center bg-background2 rounded-xl py-2 px-4">
            <span className="text-xl text-background1">90</span>
            <span className="text-xs text-background1">points</span>
          </div>
          <div className="flex flex-1 w-full flex-col items-center bg-background2 rounded-xl py-2 px-4">
            <span className="text-xl text-background1">5</span>
            <span className="text-xs text-background1">quests</span>
          </div>
        </div>
        <Link href={`/journey/${journeyId}`} className="mt-4 w-full">
          <Button size="huge" className="w-full">
            Browse Journey{" "}
            <span className="">
              <ChevronRight></ChevronRight>
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
