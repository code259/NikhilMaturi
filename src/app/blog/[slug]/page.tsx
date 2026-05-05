import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { getBlogPost, getBlogPosts } from "@/lib/content";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  return {
    title: post ? `${post.title} | Nikhil Maturi` : "Blog | Nikhil Maturi",
    description: post?.description
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

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
      <article className="blog-post">
        <div className="post-meta">
          <Link href="/blog">Writing</Link>
          <span>{post.date}</span>
          <span>{post.readingTime}</span>
        </div>
        <MarkdownRenderer content={post.body} />
      </article>
    </main>
  );
}
