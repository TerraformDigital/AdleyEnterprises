import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  cta
}: {
  eyebrow?: string;
  title: string;
  description: string;
  cta?: ReactNode;
}) {
  return (
    <section className="hero">
      <div className="shell">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p className="lead">{description}</p>
        {cta ? <div className="hero-cta">{cta}</div> : null}
      </div>
    </section>
  );
}
