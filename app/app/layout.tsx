import getCurrentUser from "../actions/getCurrentUser";

export const metadata = {
  title: "App",
  description: "MLBB App",
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="max-w-7xl xl:mx-auto">{children}</section>;
}
