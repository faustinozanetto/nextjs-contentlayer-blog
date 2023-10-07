import { allPosts } from "@contentlayer/generated";
import { Metadata } from "next";
import Image from "next/image";
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

  return (
    <article className="container py-10 mx-auto max-w-5xl px-4">
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
      <div
        className="[&>*]:mb-3 [&>*:last-child]:mb-0"
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      />
    </article>
  );
}
