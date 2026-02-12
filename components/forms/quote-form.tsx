"use client";

import { type FormEventHandler, useState } from "react";

import { trackQuoteFormEvent } from "@/lib/analytics";
import type { QuoteRequestInput } from "@/lib/quote-schema";

const initialState: QuoteRequestInput = {
  name: "",
  phone: "",
  email: "",
  city: "",
  boatMakeModel: "",
  serviceNeeded: "",
  damageType: "",
  preferredContact: "phone",
  photoLinks: "",
  message: "",
  companyWebsite: ""
};

export function QuoteForm() {
  const [formState, setFormState] = useState<QuoteRequestInput>(initialState);
  const [status, setStatus] = useState<{ kind: "idle" | "loading" | "success" | "error"; message: string }>({
    kind: "idle",
    message: ""
  });

  const onChange = <K extends keyof QuoteRequestInput>(key: K, value: QuoteRequestInput[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setStatus({ kind: "loading", message: "Submitting..." });
    trackQuoteFormEvent("attempt", {
      preferred_contact: formState.preferredContact,
      service_needed: formState.serviceNeeded
    });

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState)
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Quote submission failed.");
      }

      setStatus({ kind: "success", message: result.message || "Quote request sent." });
      trackQuoteFormEvent("success", {
        preferred_contact: formState.preferredContact,
        service_needed: formState.serviceNeeded
      });
      setFormState(initialState);
    } catch (error) {
      trackQuoteFormEvent("error", {
        preferred_contact: formState.preferredContact,
        service_needed: formState.serviceNeeded
      });
      setStatus({
        kind: "error",
        message: error instanceof Error ? error.message : "Unable to send request right now."
      });
    }
  };

  return (
    <form className="quote-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <label>
          Name
          <input
            required
            value={formState.name}
            onChange={(event) => onChange("name", event.target.value)}
            autoComplete="name"
          />
        </label>

        <label>
          Phone
          <input
            required
            value={formState.phone}
            onChange={(event) => onChange("phone", event.target.value)}
            autoComplete="tel"
          />
        </label>

        <label>
          Email
          <input
            required
            type="email"
            value={formState.email}
            onChange={(event) => onChange("email", event.target.value)}
            autoComplete="email"
          />
        </label>

        <label>
          City
          <input
            required
            value={formState.city}
            onChange={(event) => onChange("city", event.target.value)}
            autoComplete="address-level2"
          />
        </label>

        <label>
          Boat Make/Model
          <input
            required
            value={formState.boatMakeModel}
            onChange={(event) => onChange("boatMakeModel", event.target.value)}
          />
        </label>

        <label>
          Service Needed
          <input
            required
            value={formState.serviceNeeded}
            onChange={(event) => onChange("serviceNeeded", event.target.value)}
          />
        </label>
      </div>

      <label>
        Damage Type / Description
        <textarea
          required
          rows={4}
          value={formState.damageType}
          onChange={(event) => onChange("damageType", event.target.value)}
        />
      </label>

      <label>
        Preferred Contact
        <select
          value={formState.preferredContact}
          onChange={(event) => onChange("preferredContact", event.target.value as QuoteRequestInput["preferredContact"])}
        >
          <option value="phone">Phone</option>
          <option value="email">Email</option>
          <option value="either">Either</option>
        </select>
      </label>

      <label>
        Photo Links (Google Drive, Dropbox, etc.)
        <input
          value={formState.photoLinks}
          onChange={(event) => onChange("photoLinks", event.target.value)}
          placeholder="Optional"
        />
      </label>

      <label>
        Additional Notes
        <textarea
          rows={4}
          value={formState.message}
          onChange={(event) => onChange("message", event.target.value)}
          placeholder="Optional"
        />
      </label>

      <label className="honeypot" aria-hidden="true">
        Company Website
        <input
          tabIndex={-1}
          autoComplete="off"
          value={formState.companyWebsite}
          onChange={(event) => onChange("companyWebsite", event.target.value)}
        />
      </label>

      <button type="submit" className="button button-primary" disabled={status.kind === "loading"}>
        {status.kind === "loading" ? "Submitting..." : "Submit Quote Request"}
      </button>

      {status.kind !== "idle" ? (
        <p role="status" className={`form-status form-status-${status.kind}`}>
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
