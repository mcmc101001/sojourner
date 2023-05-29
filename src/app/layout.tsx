import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import { getCurrentUser } from "@/lib/session";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sojourner",
  description: "Embark on your next quest!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <div className="relative">
          {children}
          {user && <NavBar />}
        </div>
      </body>
    </html>
  );
}
