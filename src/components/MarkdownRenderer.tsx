import { DistillGraphDemo } from "./DistillGraphDemo";

type MarkdownRendererProps = {
  content: string;
};

function inlineFormat(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
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

        if (trimmed.startsWith("# ")) {
          return <h1 key={index}>{trimmed.slice(2)}</h1>;
        }

        if (trimmed.startsWith("## ")) {
          return <h2 key={index}>{trimmed.slice(3)}</h2>;
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

        return <p key={index}>{inlineFormat(trimmed)}</p>;
      })}
    </div>
  );
}
