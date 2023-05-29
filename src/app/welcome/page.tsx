import JourneyItem from "@/components/JourneyItem";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import Button from "@/components/ui/Button";
import { getCurrentUser } from "@/lib/session";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <div className="w-full h-[100vh] flex flex-col items-center bg-background1">
      <div className="flex items-center justify-between mt-4 w-full border-b-2 border-background2 px-4 py-2">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={user.image!}
            alt="profile pic"
            width={30}
            height={30}
            className="rounded-full h-16 w-16 border-2 border-background1"
          />
          <span>Friend 1</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={user.image!}
            alt="profile pic"
            width={30}
            height={30}
            className="rounded-full h-16 w-16 border-2 border-background1"
          />
          <span>Friend 2</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={user.image!}
            alt="profile pic"
            width={30}
            height={30}
            className="rounded-full h-16 w-16 border-2 border-background1"
          />
          <span>Friend 3</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={user.image!}
            alt="profile pic"
            width={30}
            height={30}
            className="rounded-full h-16 w-16 border-2 border-background1"
          />
          <span>Friend 4</span>
        </div>
      </div>
      <div className="h-[10vh] flex items-center justify-center">
        <h1 className="text-background2 text-2xl font-bold">
          Start exploring!
        </h1>
        <LogoutButton />
      </div>
      <Link href="/search" className="w-[90vw]">
        <Button size="huge" className="w-full text-xl">
          Find Journeys{" "}
          <span className="">
            <ChevronRight></ChevronRight>
          </span>
        </Button>
      </Link>
      <div className="mt-4 w-[90vw] mx-2 max-h-min flex flex-col items-center text-center text-xl rounded-xl bg-background2">
        <h1 className="text-background1 font-semibold flex mt-4">
          Current Journey!
        </h1>
        <div className="p-2">
          {/* @ts-expect-error Server comp */}
          <JourneyItem
            showPicture={true}
            journeyId="cli7j6c9v00026u5kno1u0b69"
          />
        </div>
      </div>
    </div>
  );
}
