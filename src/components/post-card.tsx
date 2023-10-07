import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@contentlayer/generated";

type PostCardProps = {
  post: Post;
};

const PostCard: React.FC<PostCardProps> = (props) => {
  const { post } = props;

  return (
    <Link href={post.url}>
      <div className="bg-neutral-100 p-4 border-neutral-200 dark:border-neutral-800 border-2 rounded shadow dark:bg-neutral-900 max-w-sm">
        <Image
          className="w-full bg-no-repeat object-cover mb-2"
          src={post.image}
          alt={`${post.title} Image`}
          width={500}
          height={500}
        />
        <h3 className="mb-1 text-xl font-semibold leading-snug tracking-tight">
          {post.title}
        </h3>
        <time dateTime={post.publishDate} className="mb-2 text-sm">
          {new Date(post.publishDate).toDateString()}
        </time>
        <p>{post.description}</p>
      </div>
    </Link>
  );
};

export default PostCard;
