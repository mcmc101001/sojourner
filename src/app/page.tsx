import LoginButton from "@/components/Loginbutton";
import LogoutButton from "@/components/LogoutButton";
import { getCurrentUser } from "@/lib/session";

export default async function Home() {
  let user = await getCurrentUser();

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-teal text-2xl text-beige">
      {user ? (
        <>
          <h1>{user.name}</h1>
          <LogoutButton />
        </>
      ) : (
        <>
          <h1>Not logged in</h1>
          <LoginButton />
        </>
      )}
    </div>
  );
}
