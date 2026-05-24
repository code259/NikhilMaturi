import {
  AgentLoopFigure,
  AICodingGallery,
  AICodingSkillCards,
  ContextMapFigure,
  PromptContrastFigure,
  VerificationRiskFigure
} from "./AICodingEssayVisuals";
import { DistillGraphDemo } from "./DistillGraphDemo";

type MarkdownRendererProps = {
  content: string;
};

function inlineFormat(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={index} href={link[2]} target={link[2].startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          {link[1]}
        </a>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const blocks = content.split(/\n{2,}/);

  return (
    <div className="markdown-flow">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        if (trimmed === ":::interactive graph-message-passing\n:::") {
          return <DistillGraphDemo key={index} />;
        }

        if (trimmed === ":::visual ai-skill-cards\n:::") {
          return <AICodingSkillCards key={index} />;
        }

        if (trimmed === ":::visual ai-gallery\n:::") {
          return <AICodingGallery key={index} />;
        }

        if (trimmed === ":::visual agent-loop\n:::") {
          return <AgentLoopFigure key={index} />;
        }

        if (trimmed === ":::visual verification-risk\n:::") {
          return <VerificationRiskFigure key={index} />;
        }

        if (trimmed === ":::visual prompt-contrast\n:::") {
          return <PromptContrastFigure key={index} />;
        }

        if (trimmed === ":::visual context-map\n:::") {
          return <ContextMapFigure key={index} />;
        }

        if (trimmed.startsWith("# ")) {
          return <h1 key={index}>{trimmed.slice(2)}</h1>;
        }

        if (trimmed.startsWith("## ")) {
          return <h2 key={index}>{trimmed.slice(3)}</h2>;
        }

        if (trimmed.startsWith("### ")) {
          return <h3 key={index}>{trimmed.slice(4)}</h3>;
        }

        if (/^\d+\. /m.test(trimmed)) {
          return (
            <ol key={index}>
              {trimmed.split("\n").map((item) => (
                <li key={item}>{inlineFormat(item.replace(/^\d+\. /, ""))}</li>
              ))}
            </ol>
          );
        }

        if (/^- /m.test(trimmed)) {
          return (
            <ul key={index}>
              {trimmed.split("\n").map((item) => (
                <li key={item}>{inlineFormat(item.replace(/^- /, ""))}</li>
              ))}
            </ul>
          );
        }

        return <p key={index}>{inlineFormat(trimmed)}</p>;
      })}
    </div>
  );
}
