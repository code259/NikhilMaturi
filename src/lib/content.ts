import fs from "node:fs";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  body: string;
};

const blogDir = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: raw };
  }

  const data = Object.fromEntries(
    match[1]
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [key, ...rest] = line.split(":");
        return [key.trim(), rest.join(":").trim().replace(/^"|"$/g, "")];
      })
  ) as Record<string, string>;

  return { data, body: match[2].trim() };
}

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogDir)) return [];

  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
      const { data, body } = parseFrontmatter(raw);
      const slug = file.replace(/\.md$/, "");
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        readingTime: data.readingTime ?? "Draft",
        body
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPost(slug: string) {
  return getBlogPosts().find((post) => post.slug === slug);
}
