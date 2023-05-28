import LoginButton from "@/components/Loginbutton";
import LogoutButton from "@/components/LogoutButton";
import { getCurrentUser } from "@/lib/session";

export default async function Home() {
  let user = await getCurrentUser();

  return (
    <div>
      {user ? (
        <>
          <LogoutButton />
          <h1>{user.name}</h1>
        </>
      ) : (
        <>
          <LoginButton />
          <h1>Not logged in</h1>
        </>
      )}
    </div>
  );
}
