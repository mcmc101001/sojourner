import LoginButton from "@/components/LoginButton";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  let user = await getCurrentUser();

  if (user) {
    redirect("/welcome");
  }

  return (
    <div className="w-full h-[100vh] flex flex-col gap-y-6 items-center justify-center bg-background2">
      <div>
        <Image src="/logo.png" alt="me" width="256" height="256" />
      </div>
      <div className="w-[80vw] flex items-center justify-center text-center text-3xl text-background1">
        <h1>Ready for your first adventure?</h1>
      </div>
      <LoginButton />
    </div>
  );
}
