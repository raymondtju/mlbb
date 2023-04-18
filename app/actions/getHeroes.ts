import prisma from "@/app/libs/prismadb";

export default async function getHeroes() {
  try {
    const heroes = await prisma.heros.findMany();
    return heroes;
  } catch (error) {
    throw new Error("Failed to fetch heroes");
  }
}
