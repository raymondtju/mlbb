import "./globals.css";

export const metadata = {
  title: "MLBB Forum",
  description: "MLBB Forum hehehehe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#111827] text-[#FFFFFF]">
        <div className="relative">
          <div className="absolute max-w-[1440px] max-h-[863px] -top-2/4 inset-0 bg-[#6C4BEF]/40 rounded-full blur-[287.5px] -z-10"></div>
          <div className="max-w-[1440px] px-[150px] mx-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
