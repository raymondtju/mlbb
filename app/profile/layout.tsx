export const metadata = {
  title: "Profile - mlbb.fyi",
  description: "Your mlbb.fyi Profile ",
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="max-w-7xl xl:mx-auto">{children}</section>;
}
