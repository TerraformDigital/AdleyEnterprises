"use client";

import { useEffect, useId, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { TrackedPhoneLink } from "@/components/analytics/tracked-phone-link";
import type { SiteSettings } from "@/types/content";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/products", label: "Products" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

function isActiveLink(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileNavId = useId();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          <Link href="/" className="brand">
            <Image
              src="/images/Adley-Enterprises-logo-concept-white.png"
              alt="Adley Enterprises LLC"
              className="brand-logo"
              width={320}
              height={98}
              priority
            />
          </Link>

          <div className="header-desktop-nav">
            <nav aria-label="Main navigation">
              <ul className="nav-list">
                {navItems.map((item) => {
                  const isActive = isActiveLink(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link href={item.href} className={isActive ? "nav-link nav-link-active" : "nav-link"}>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <TrackedPhoneLink phone={settings.phone} context="site_header_desktop" className="button button-primary header-call">
              Call {settings.phone}
            </TrackedPhoneLink>
          </div>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={isMenuOpen}
            aria-controls={mobileNavId}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              setIsMenuOpen((current) => !current);
            }}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {!isMenuOpen ? null : (
        <div className="mobile-nav-shell" id={mobileNavId}>
          <button
            type="button"
            className="mobile-nav-backdrop"
            aria-label="Close mobile navigation"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          />
          <div className="mobile-nav-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
            <nav aria-label="Mobile navigation links">
              <ul className="mobile-nav-list">
                {navItems.map((item) => {
                  const isActive = isActiveLink(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={isActive ? "mobile-nav-link mobile-nav-link-active" : "mobile-nav-link"}
                        onClick={() => {
                          setIsMenuOpen(false);
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mobile-nav-actions">
              <TrackedPhoneLink phone={settings.phone} context="site_header_mobile" className="button button-primary">
                Call {settings.phone}
              </TrackedPhoneLink>
              <Link
                href="/contact"
                className="button button-secondary"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Request Estimate
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
