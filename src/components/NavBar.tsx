import { getCurrentUser } from "@/lib/session";
import { Home, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NewJourneyButton from "./newJourneyButton";

export default async function NavBar() {
  const user = await getCurrentUser();
  if (!user) return <div>Not found</div>;

  return (
    <div className="fixed z-50 bottom-0 w-full h-14 flex justify-between items-center px-8 py-3 bg-background2">
      <div className="flex items-center justify-center p-2 rounded-full h-10 w-10 bg-background1">
        <Link href="/welcome">
          <Home />
        </Link>
      </div>
      <div className="flex items-center justify-center p-2 rounded-full h-10 w-10 bg-background1">
        <Link href="/search">
          <Search />
        </Link>
      </div>
      <div className="flex items-center justify-center p-2 rounded-full h-10 w-10 bg-background1">
        <NewJourneyButton userId={user.id} />
      </div>
      <Link href={`/profile/${user.id}`}>
        <Image
          src={user.image!}
          alt="profile pic"
          width={30}
          height={30}
          className="rounded-full h-10 w-10 border-2 border-background1"
        />
      </Link>
    </div>
  );
}
