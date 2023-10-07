import { allPosts } from "@contentlayer/generated";
import PostCard from "components/post-card";

export default function Home() {
  // Sort the blog posts by publish date in descending order
  const posts = allPosts.sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">
        Next.JS Contentlayer Blog Tutorial
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}
