"use client";

import { Post } from "@prisma/client";

interface PostsProps {
  items: Post[];
}

const PostList: React.FC<PostsProps> = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <h1>{item.title}</h1>
      ))}
    </div>
  );
};

export default PostList;
