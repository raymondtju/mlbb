"use client";

import { User } from "@prisma/client";
import PostForm from "./post-form";
import { SafeUser } from "@/types";

interface PostTopBarProps {
  currUser?: SafeUser;
}

const PostTopBar: React.FC<PostTopBarProps> = ({ currUser }) => {
  return (
    <>
      <div className="flex flex-row gap-6">
        {currUser && <PostForm currUser={currUser} />}
      </div>
    </>
  );
};

export default PostTopBar;
