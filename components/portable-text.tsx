import { PortableText, type PortableTextComponents } from "@portabletext/react";

import type { PortableTextValue } from "@/types/content";

type PortableTextTypedObject = {
  _type: string;
  _key?: string;
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const external = href.startsWith("http");
      return (
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
          {children}
        </a>
      );
    }
  }
};

export function RichText({ value }: { value?: PortableTextValue }) {
  if (!value || value.length === 0) {
    return null;
  }

  return <PortableText value={value as unknown as PortableTextTypedObject[]} components={components} />;
}
