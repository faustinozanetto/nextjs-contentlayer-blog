"use client";

import React from "react";
import Image from "next/image";
import { Post as PostData } from "@contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";

const components = {
  Image,
};

type BlogPostProps = {
  post: PostData;
};

const BlogPost: React.FC<BlogPostProps> = (props) => {
  const { post } = props;

  const MDXComponent = useMDXComponent(post.body.code);

  return (
    <article className="prose dark:prose-invert container py-10 mx-auto max-w-5xl px-4">
      <div className="mb-8">
        <Image
          className="w-full bg-no-repeat object-cover mb-2 h-80"
          src={post.image}
          alt={`${post.title} Image`}
          width={500}
          height={500}
        />
        <h1 className="mb-1 text-xl font-semibold leading-snug tracking-tight">
          {post.title}
        </h1>
        <time dateTime={post.publishDate} className="mb-2 text-sm">
          {new Date(post.publishDate).toDateString()}
        </time>
        <p className="mt-1.5">{post.description}</p>
      </div>
      <MDXComponent components={components} />
    </article>
  );
};

export default BlogPost;
