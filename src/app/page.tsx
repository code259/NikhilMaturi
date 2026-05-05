import Link from "next/link";
import { ResearchObservatory } from "@/components/ResearchObservatory";
import { ScrollReveal } from "@/components/ScrollReveal";
import { contacts, researchProjects } from "@/lib/data";
import { getBlogPosts } from "@/lib/content";

export default function Home() {
  const posts = getBlogPosts();
  const featured = researchProjects.find((project) => project.featured) ?? researchProjects[0];

  return (
    <main>
      <ScrollReveal />
      <header className="site-header">
        <Link href="/" className="brand">
          NM
        </Link>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#research">Research</a>
          <Link href="/blog">Blog</Link>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="about">
        <img
          src="/images/hero-ai-bio-android-minimal.png"
          alt=""
          className="hero-art"
          aria-hidden="true"
        />
        <div className="hero-copy">
          <div
            className="token-badge"
            title="Approximate size of the public notes and project copy on this site."
          >
            <span>Site notes</span>
            <strong>~6.8K tokens</strong>
          </div>
          <h1>Nikhil Maturi</h1>
          <p>
            I work on AI for scientific problems, mostly in biology and medicine.
            I like models that help us ask better questions, not just models that
            score higher on a benchmark.
          </p>
          <div className="hero-actions">
            <a href="#research">Explore research</a>
            <Link href="/blog">Read writing</Link>
          </div>
        </div>
      </section>

      <section className="featured-project" aria-label="Featured project">
        <div>
          <span>Featured project</span>
          <h2>{featured.title}</h2>
          <p>{featured.subtitle}</p>
        </div>
        <div className="featured-actions">
          <Link href={`/research/${featured.slug}`}>Project page</Link>
          {featured.href ? (
            <a href={featured.href} target="_blank" rel="noreferrer">
              HELIX site
            </a>
          ) : null}
        </div>
      </section>

      <section className="research-section" id="research">
        <div className="section-heading">
          <span>Research</span>
          <h2>Projects across molecules, imaging, cells, and clinical prediction</h2>
        </div>
        <div className="research-list">
          {researchProjects.map((project) => (
            <Link
              href={`/research/${project.slug}`}
              className={project.featured ? "research-card featured" : "research-card"}
              key={project.slug}
            >
              <div style={{ ["--accent" as string]: project.color }} className="project-orb" />
              <span>
                {project.area} / {project.year}
              </span>
              <h3>{project.title}</h3>
              <p>{project.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      <ResearchObservatory projects={researchProjects} />

      <section className="writing-section" id="writing">
        <div className="section-heading">
          <span>Writing</span>
          <h2>Notes on models, biology, and ideas I’m still working through</h2>
          <p>
            Essays are Markdown-backed. Some include small interactive figures when a
            static diagram would hide the interesting part.
          </p>
        </div>
        <div className="post-strip">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="post-card">
              <span>{post.date} / {post.readingTime}</span>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="contact-section" id="contact">
        <div>
          <span>Contact</span>
          <h2>For research conversations, collaborations, or notes, email me.</h2>
        </div>
        <div className="contact-grid">
          {contacts.map((contact) => (
            <a href={contact.href} key={contact.label} target="_blank" rel="noreferrer">
              <span>{contact.label}</span>
              <strong>{contact.value}</strong>
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}
