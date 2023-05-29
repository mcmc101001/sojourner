import JourneyItem from "@/components/JourneyItem";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-background1">
      <div className="h-[20vh] flex items-center justify-center">
        <h1 className="text-background2 text-2xl font-bold">
          Start exploring!
        </h1>
      </div>
      <div className="w-[100vw] h-full flex flex-col items-center justify-center text-center text-3xl rounded-t-3xl bg-background2">
        <h1 className="text-background1 flex my-6">Current Journey</h1>
        {/* @ts-expect-error Server components */}
        <JourneyItem showPicture={true} journeyId="cli7j6c9v00026u5kno1u0b69" />
      </div>
    </div>
  );
}
