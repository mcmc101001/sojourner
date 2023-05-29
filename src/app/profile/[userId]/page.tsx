import JourneyItem from "@/components/JourneyItem";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { UserPlus } from "lucide-react";
import Image from "next/image";

export default async function Page({ params }: { params: { userId: string } }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return <div>Not found</div>;

  const profileUser = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  if (!profileUser) return <div>Not found</div>;

  const profileJourneys = await prisma.journey.findMany({
    where: {
      createdById: params.userId,
    },
  });

  const isProfile = currentUser.id === profileUser.id;

  return (
    <div className="w-full h-full bg-background2 flex flex-col items-center">
      <div className="w-full h-full flex items-center pt-4 px-4">
        <Image
          src={profileUser.image!}
          alt="profile pic"
          width={140}
          height={140}
          className="mx-4 rounded-full border-4 border-background1"
        />
        <div className="w-full flex flex-col items-center justify-center py-8">
          <span className="text-background1 text-2xl font-semibold">
            {profileUser?.name}
          </span>
          <span className="text-background1 text-base font-normal">
            Following: 20
          </span>
        </div>
        {isProfile || <UserPlus className="h-12 w-12 text-primary" />}
      </div>
      <div className="bg-background1 pt-2 px-3 pb-20">
        <span className="text-background2 font-semibold text-lg">
          Published journeys:
        </span>
        <ul className="w-full">
          {profileJourneys.map((journey) => {
            return (
              <ul key={journey.id}>
                <li className="mt-2 px-2">
                  {/* @ts-expect-error Server comp */}
                  <JourneyItem journeyId={journey.id} />
                </li>
              </ul>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
