import Link from "next/link";
import { getBlogPosts } from "@/lib/content";

export const metadata = {
  title: "Blog | Nikhil Maturi",
  description: "Markdown-backed writing and interactive science notes."
};

export default function BlogIndex() {
  const posts = getBlogPosts();

  return (
    <main className="detail-page">
      <header className="subpage-header">
        <Link href="/">NM</Link>
        <nav>
          <Link href="/#about">About</Link>
          <Link href="/#research">Research</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>
      <section className="blog-index-hero">
        <span>Writing</span>
        <h1>Blog</h1>
        <p>
          Notes on AI for science, biological graphs, generative discovery, and
          the places where models need better scientific taste.
        </p>
      </section>
      <section className="blog-index-list">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug}>
            <span>{post.date} / {post.readingTime}</span>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
