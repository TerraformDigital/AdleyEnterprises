import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  cta,
  backgroundVideo
}: {
  eyebrow?: string;
  title: string;
  description: string;
  cta?: ReactNode;
  backgroundVideo?: {
    src: string;
    type?: string;
    poster?: string;
  };
}) {
  return (
    <section className={`hero ${backgroundVideo ? "hero-has-media" : ""}`}>
      {backgroundVideo ? (
        <>
          <video
            className="hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={backgroundVideo.poster}
            aria-hidden="true"
          >
            <source src={backgroundVideo.src} type={backgroundVideo.type ?? "video/mp4"} />
          </video>
          <div className="hero-overlay" aria-hidden="true" />
        </>
      ) : null}
      <div className="shell hero-content">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p className="lead">{description}</p>
        {cta ? <div className="hero-cta">{cta}</div> : null}
      </div>
    </section>
  );
}
