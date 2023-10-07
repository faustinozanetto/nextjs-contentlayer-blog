import { allPosts } from "@contentlayer/generated";
import PostCard from "components/post-card";

export default function Home() {
  const posts = allPosts.sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">
        Next.JS Contentlayer Blog Tutorial 🚀
      </h1>
      <div className="grid gap-4 grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}
