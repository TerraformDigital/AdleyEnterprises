"use client";

import type { ReactNode } from "react";

import { trackCallClick } from "@/lib/analytics";

interface TrackedPhoneLinkProps {
  phone: string;
  context: string;
  className?: string;
  children?: ReactNode;
}

function toDialString(phone: string) {
  return phone.replace(/[^+\d]/g, "");
}

export function TrackedPhoneLink({ phone, context, className, children }: TrackedPhoneLinkProps) {
  return (
    <a
      href={`tel:${toDialString(phone)}`}
      className={className}
      onClick={() => {
        trackCallClick(context);
      }}
    >
      {children ?? phone}
    </a>
  );
}
