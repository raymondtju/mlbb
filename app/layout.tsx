import "./globals.css";
import { Inter } from "next/font/google";

import Navbar from "./components/navbar/Navbar";
import getCurrentUser from "./actions/getCurrentUser";
import ToasterProvider from "./providers/ToasterProvider";
import Client from "./components/Client";

export const metadata = {
  title: "MLMastermind's",
  description: "MLBB Forum hehehehe",
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      {/* bg-Gray-900 text-[#FFFFFF] */}
      <body className={`${inter.className}`}>
        <div className="relative mx-auto min-h-screen overflow-hidden">
          <div className="max-w-7xl px-4 xl:mx-auto">
            <Navbar currentUser={currentUser} />
            <ToasterProvider />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

{
  /* <div className="absolute inset-0 -top-[400px] -z-10 max-h-[863px] max-w-7xl rounded-full bg-Purple-500/40 blur-[287.5px] "></div>

          <div className="absolute inset-0 left-[calc(50%-898px/2-720px)] top-[800px] -z-10 max-h-[863px] max-w-[898px] rounded-full bg-Cyan-500/40 blur-[287.5px] "></div>

          <div className="absolute inset-0 right-[calc(50%-898px/2-720px)] top-[1400px] -z-10 max-h-[863px] max-w-[898px] rounded-full bg-red-500/40 blur-[287.5px] "></div> */
}
