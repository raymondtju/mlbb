"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SafeUser } from "@/types";
import { Input } from "../shared/input";
import { Button } from "../shared/button";
import { Label } from "../shared/label";
import LoadingDots from "../shared/icons/loading-dots";
<<<<<<< HEAD

interface newPost {
  currentUser?: SafeUser | null;
}

const EditForm: React.FC<newPost> = ({ currentUser }) => {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [titleCharacterCount, setTitleCharacterCount] = useState<number>(0);
  const [messageCharacterCount, setMessageCharacterCount] = useState<number>(0);

  return (
    <>
      <h1 className="text-heading text-center text-3xl font-bold">
        Post New Topic
      </h1>
=======
import getCurrentPost from "@/lib/actions/getCurrentPost";
import { Post } from "@prisma/client";

interface editPostProps {
  post: Post;
}

const EditForm: React.FC<editPostProps> = ({ post }) => {
  const router = useRouter();

  const [title, setTitle] = useState<string>(post.title);
  const [message, setMessage] = useState<string>(post.body);
  const [loading, setLoading] = useState<boolean>(false);
  const [isTitleInputFocused, setIsTitleInputFocused] =
    useState<boolean>(false);
  const [isMessageInputFocused, setIsMessageInputFocused] =
    useState<boolean>(false);
  const [titleCharacterCount, setTitleCharacterCount] = useState<number>(
    post.title.length
  );
  const [messageCharacterCount, setMessageCharacterCount] = useState<number>(
    post.body.length
  );

  return (
    <>
      <h1 className="text-center font-heading text-3xl font-bold">Edit</h1>
>>>>>>> a911706eeb329c8fb6c09eef1bf2def4148cb046
      <div className="mx-auto max-w-md">
        <form
          className="flex w-full flex-col gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const fields = {
              title: title,
              message: message,
<<<<<<< HEAD
            };

            const set = await fetch("/explore/stg/api/post", {
=======
              post: post,
            };

            const set = await fetch("/explore/stg/api/edit", {
>>>>>>> a911706eeb329c8fb6c09eef1bf2def4148cb046
              method: "POST",
              body: JSON.stringify(fields),
            });
            const msg = await set.json();
            if (!set.ok) {
              setLoading(false);
              toast.error(msg.message);
            } else {
              setLoading(false);
<<<<<<< HEAD
              toast.success("Successfully posted! Please refresh");
              router.push(`/explore`);
=======
              toast.success(msg.message);
              window.location.reload();
>>>>>>> a911706eeb329c8fb6c09eef1bf2def4148cb046
            }
          }}
        >
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              type="title"
<<<<<<< HEAD
              placeholder="Title"
=======
              placeholder="Insert title here"
              defaultValue={post.title}
>>>>>>> a911706eeb329c8fb6c09eef1bf2def4148cb046
              onChange={(e) => {
                const inputValue = e.target.value;
                setTitle(inputValue);
                setTitleCharacterCount(inputValue.length);
              }}
<<<<<<< HEAD
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              name="title"
              maxLength={50}
            />
            {isInputFocused && (
=======
              onFocus={() => setIsTitleInputFocused(true)}
              onBlur={() => setIsTitleInputFocused(false)}
              name="title"
              maxLength={50}
            />
            {isTitleInputFocused && (
>>>>>>> a911706eeb329c8fb6c09eef1bf2def4148cb046
              <p className="text-[10px] text-neutral-500">
                {titleCharacterCount} / {50} characters
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="body">Message</Label>
            <Input
              type="Body"
<<<<<<< HEAD
=======
              placeholder="Insert message here"
              defaultValue={post.body}
>>>>>>> a911706eeb329c8fb6c09eef1bf2def4148cb046
              onChange={(e) => {
                const inputValue = e.target.value;
                setMessage(inputValue);
                setMessageCharacterCount(inputValue.length);
              }}
<<<<<<< HEAD
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              name="body"
              maxLength={2000}
            />
            {isInputFocused && (
=======
              onFocus={() => setIsMessageInputFocused(true)}
              onBlur={() => setIsMessageInputFocused(false)}
              name="body"
              maxLength={2000}
            />
            {isMessageInputFocused && (
>>>>>>> a911706eeb329c8fb6c09eef1bf2def4148cb046
              <p className="text-[10px] text-neutral-500">
                {messageCharacterCount} / {2000} characters
              </p>
            )}
          </div>

<<<<<<< HEAD
          <Button className="mb-8 mt-1 rounded-full" variant="gradiantNavy">
=======
          <Button
            disabled={post.title === title && post.body === message}
            className="mb-8 mt-1 rounded-full"
            variant="gradiantNavy"
          >
>>>>>>> a911706eeb329c8fb6c09eef1bf2def4148cb046
            {loading ? (
              <>
                <LoadingDots color="#FAFAFA" />
              </>
            ) : (
<<<<<<< HEAD
              "Post"
=======
              "Edit"
>>>>>>> a911706eeb329c8fb6c09eef1bf2def4148cb046
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditForm;
