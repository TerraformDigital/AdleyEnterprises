import { PortableText, type PortableTextComponents } from "@portabletext/react";

import type { PortableTextValue } from "@/types/content";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>
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

  return <PortableText value={value} components={components} />;
}
