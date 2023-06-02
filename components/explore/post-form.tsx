"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SafeUser } from "@/types";
import { Input } from "../shared/input";
import { Button } from "../shared/button";
import { Label } from "../shared/label";

interface newPost {
  currentUser?: SafeUser | null;
}

const PostForm: React.FC<newPost> = ({ currentUser }) => {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [titleCharacterCount, setTitleCharacterCount] = useState<number>(0);
  const [bodyCharacterCount, setBodyCharacterCount] = useState<number>(0);

  return (
    <>
      <h1 className="text-center font-heading text-3xl font-bold">
        Post New Topic
      </h1>
      <div className="mx-auto max-w-md">
        <form
          className="flex w-full flex-col gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const fields = {
              title: title,
              body: body,
            };

            const set = await fetch("/explore/stg/api/post", {
              method: "POST",
              body: JSON.stringify(fields),
            });
            const msg = await set.json();
            if (!set.ok) {
              setLoading(false);
              toast.error(msg.message);
            } else {
              setLoading(false);
              toast.success(
                "Successfully updated profile, kindly wait before making any more updates"
              );
              router.push(`/explore`);
            }
          }}
        >
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              type="title"
              placeholder="Title"
              onChange={(e) => {
                const inputValue = e.target.value;
                setTitle(inputValue);
                setTitleCharacterCount(inputValue.length);
              }}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              name="title"
              maxLength={50}
            />
            {isInputFocused && (
              <p className="text-[10px] text-neutral-500">
                {titleCharacterCount} / {50} characters
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="body">Body</Label>
            <Input
              type="Body"
              onChange={(e) => {
                const inputValue = e.target.value;
                setBody(inputValue);
                setBodyCharacterCount(inputValue.length);
              }}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              name="body"
              maxLength={2000}
            />
            {isInputFocused && (
              <p className="text-[10px] text-neutral-500">
                {bodyCharacterCount} / {2000} characters
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default PostForm;
