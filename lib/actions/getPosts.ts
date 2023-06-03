import prisma from "@/lib/prismadb";

export default async function getPosts() {
  try {
    const posts = await prisma.post.findMany();

    return posts;
  } catch (error: any) {
    return null;
  }
}
