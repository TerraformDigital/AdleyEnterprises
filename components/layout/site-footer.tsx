import Link from "next/link";

import { TrackedPhoneLink } from "@/components/analytics/tracked-phone-link";
import type { SiteSettings } from "@/types/content";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <h2>{settings.legalName}</h2>
          <p>
            {settings.streetAddress}, {settings.city}, {settings.region} {settings.postalCode}
          </p>
          <p>
            <TrackedPhoneLink phone={settings.phone} context="site_footer">
              {settings.phone}
            </TrackedPhoneLink>
          </p>
          <p>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
          </p>
        </div>

        <div>
          <h2>Top Pages</h2>
          <ul className="list-reset">
            <li>
              <Link href="/services/fiberglass-boat-repair">Fiberglass Boat Repair</Link>
            </li>
            <li>
              <Link href="/services/hull-collision-repair">Hull Collision Repair</Link>
            </li>
            <li>
              <Link href="/products/adjustable-transducer-mounts">Adjustable Transducer Mounts</Link>
            </li>
            <li>
              <Link href="/service-areas">Service Areas</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2>Hours</h2>
          <ul className="list-reset">
            {settings.hours.map((hour) => (
              <li key={hour.day}>
                {hour.day}: {hour.notes ?? `${hour.opens}-${hour.closes}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="shell footer-meta">
        <p>
          &copy; {new Date().getFullYear()} {settings.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
