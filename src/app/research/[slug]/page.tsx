import Link from "next/link";
import { notFound } from "next/navigation";
import { ResearchConceptMotion } from "@/components/ResearchConceptMotion";
import { researchProjects } from "@/lib/data";

type ResearchPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return researchProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ResearchPageProps) {
  const { slug } = await params;
  const project = researchProjects.find((item) => item.slug === slug);
  return {
    title: project ? `${project.title} | Nikhil Maturi` : "Research | Nikhil Maturi",
    description: project?.subtitle
  };
}

export default async function ResearchPage({ params }: ResearchPageProps) {
  const { slug } = await params;
  const project = researchProjects.find((item) => item.slug === slug);

  if (!project) notFound();

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
      <section className="research-hero" style={{ ["--accent" as string]: project.color }}>
        <div className="research-hero-copy">
          <span>{project.area}</span>
          <h1>{project.title}</h1>
          <p>{project.abstract}</p>
          {project.href ? (
            <a href={project.href} target="_blank" rel="noreferrer">
              Visit project site
            </a>
          ) : null}
        </div>
        <ResearchConceptMotion project={project} />
      </section>
      <section className="detail-body">
        <div className="detail-rail">
          <span>{project.year}</span>
          <strong>Research blurb</strong>
        </div>
        <article>
          {project.details.map((detail) => (
            <p key={detail}>{detail}</p>
          ))}
        </article>
      </section>
    </main>
  );
}
