import { allPosts } from "@contentlayer/generated";
import BlogPost from "components/blog-post";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type PostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map((post) => ({
    slug: post.url,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) throw new Error(`Could not find post for slug: ${params.slug}`);

  const { title, description } = post;

  return {
    title,
    description,
  };
}

export default async function PostPage(props: PostPageProps) {
  const { params } = props;

  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) notFound();

  return <BlogPost post={post} />;
}
