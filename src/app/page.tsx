import Link from "next/link";
import { HeroField } from "@/components/HeroField";
import { ResearchObservatory } from "@/components/ResearchObservatory";
import { contacts, researchProjects } from "@/lib/data";
import { getBlogPosts } from "@/lib/content";

export default function Home() {
  const posts = getBlogPosts();
  const featured = researchProjects.find((project) => project.featured) ?? researchProjects[0];

  return (
    <main>
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
        <HeroField />
        <div className="hero-art android-bio-art" aria-hidden="true">
          <div className="liquid-field">
            <span />
            <span />
            <span />
          </div>
          <div className="android-head">
            <span className="cranial-glass" />
            <span className="faceplate" />
            <span className="jaw-core" />
            <span className="neck-column" />
            <span className="ocular-slit" />
          </div>
          <div className="bio-circuit">
            <span />
            <span />
            <span />
          </div>
          <div className="helix-ribbon">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="hero-copy">
          <h1>Nikhil Maturi</h1>
          <p>
            Building at the edge of AI for science: generative biology,
            scientific machine learning, computational medicine, and visual systems
            that make hard ideas easier to reason about.
          </p>
          <div className="hero-actions">
            <a href="#research">Explore research</a>
            <Link href="/blog">Read writing</Link>
          </div>
        </div>
        <aside className="mission-panel">
          <span>Current vector</span>
          <strong>AI systems for scientific discovery</strong>
          <p>
            Predictive models, generative design loops, biological mechanism, and
            explainable technical writing.
          </p>
        </aside>
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
          <h2>Past work across molecules, imaging, cells, and clinical prediction</h2>
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
          <h2>Field notes on AI systems that reason over biology</h2>
          <p>
            Essays are written in Markdown and can embed small explorable diagrams when
            static prose stops being enough.
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
          <h2>Open to research conversations, collaborations, and thoughtful notes.</h2>
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
