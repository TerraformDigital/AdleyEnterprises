import Link from "next/link";

import { TrackedPhoneLink } from "@/components/analytics/tracked-phone-link";
import type { SiteSettings } from "@/types/content";

export function CtaBanner({ settings }: { settings: SiteSettings }) {
  return (
    <section className="cta-banner" aria-label="Primary conversion actions">
      <div className="shell cta-banner-inner">
        <div>
          <h2>Request a Fiberglass Repair Estimate</h2>
          <p>Call now or send photos using our quote form.</p>
        </div>
        <div className="cta-actions">
          <TrackedPhoneLink phone={settings.phone} context="cta_banner" className="button button-primary">
            Call {settings.phone}
          </TrackedPhoneLink>
          <Link href="/contact" className="button button-secondary">
            Request Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
