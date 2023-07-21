"use server";
import { revalidatePath } from "next/cache";

export async function revalPath(url: string) {
  console.log("object");
  revalidatePath(url);
}
