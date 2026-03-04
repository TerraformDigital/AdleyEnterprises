import type { QuoteRequestInput } from "@/lib/quote-schema";

const BRAND = {
  bg: "#09090b",
  panel: "#111114",
  border: "#27272a",
  text: "#f4f4f5",
  textMuted: "#a1a1aa",
  accent: "#dc2626"
} as const;

const BUSINESS = {
  name: "Adley Enterprises LLC",
  phone: "+1 (320) 726-0822",
  email: "sales@adleyenterprises.com",
  address: "16 Industry Parkway NW, Melrose, MN 56352"
} as const;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeText(value: string | undefined) {
  return escapeHtml((value || "").trim() || "N/A");
}

function formatPreferredContact(value: QuoteRequestInput["preferredContact"]) {
  if (value === "phone") return "Phone";
  if (value === "email") return "Email";
  return "Either";
}

function parsePhotoLinks(raw: string) {
  return raw
    .split(/[\n,]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.textMuted}; font-size: 13px; width: 180px; vertical-align: top;">
        ${escapeHtml(label)}
      </td>
      <td style="padding: 10px 0; border-bottom: 1px solid ${BRAND.border}; color: ${BRAND.text}; font-size: 14px; vertical-align: top;">
        ${value}
      </td>
    </tr>
  `;
}

export function buildQuoteEmailText(data: QuoteRequestInput) {
  return [
    "New Quote Request",
    "-----------------",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `City: ${data.city}`,
    `Boat Make/Model: ${data.boatMakeModel}`,
    `Service Needed: ${data.serviceNeeded}`,
    `Damage Type: ${data.damageType}`,
    `Preferred Contact: ${formatPreferredContact(data.preferredContact)}`,
    `Photo Links: ${data.photoLinks || "N/A"}`,
    `Additional Notes: ${data.message || "N/A"}`
  ].join("\n");
}

export function buildQuoteEmailHtml(data: QuoteRequestInput) {
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  });

  const photoLinks = parsePhotoLinks(data.photoLinks || "");
  const photoLinksHtml =
    photoLinks.length > 0
      ? `<ul style="margin: 0; padding-left: 18px;">
          ${photoLinks
            .map(
              (link) =>
                `<li style="margin: 0 0 6px;"><a href="${escapeHtml(link)}" style="color: #f87171;">${escapeHtml(link)}</a></li>`
            )
            .join("")}
         </ul>`
      : "N/A";

  const notesHtml = normalizeText(data.message).replace(/\n/g, "<br />");

  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Quote Request</title>
  </head>
  <body style="margin: 0; padding: 0; background: ${BRAND.bg}; color: ${BRAND.text}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="background: ${BRAND.bg}; padding: 24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="max-width: 680px; margin: 0 auto; background: ${BRAND.panel}; border: 1px solid ${BRAND.border}; border-radius: 14px; overflow: hidden;">
            <tr>
              <td style="padding: 24px 24px 18px; border-bottom: 1px solid ${BRAND.border};">
                <p style="margin: 0; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: ${BRAND.textMuted};">New Submission</p>
                <h1 style="margin: 8px 0 0; font-size: 24px; line-height: 1.2; color: ${BRAND.text};">
                  Quote Request
                </h1>
                <p style="margin: 8px 0 0; font-size: 13px; color: ${BRAND.textMuted};">
                  ${escapeHtml(BUSINESS.name)} • ${escapeHtml(submittedAt)}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 24px;">
                <table role="presentation" width="100%" cellPadding="0" cellSpacing="0">
                  ${detailRow("Name", normalizeText(data.name))}
                  ${detailRow("Phone", `<a href="tel:${escapeHtml(data.phone.replace(/[^\d+]/g, ""))}" style="color: #f87171;">${normalizeText(data.phone)}</a>`)}
                  ${detailRow("Email", `<a href="mailto:${escapeHtml(data.email)}" style="color: #f87171;">${normalizeText(data.email)}</a>`)}
                  ${detailRow("City", normalizeText(data.city))}
                  ${detailRow("Boat Make/Model", normalizeText(data.boatMakeModel))}
                  ${detailRow("Service Needed", normalizeText(data.serviceNeeded))}
                  ${detailRow("Damage Type", normalizeText(data.damageType))}
                  ${detailRow("Preferred Contact", normalizeText(formatPreferredContact(data.preferredContact)))}
                  ${detailRow("Photo Links", photoLinksHtml)}
                  ${detailRow("Additional Notes", notesHtml)}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 18px 24px 22px; border-top: 1px solid ${BRAND.border}; background: #0b0b0d;">
                <p style="margin: 0 0 8px; color: ${BRAND.textMuted}; font-size: 12px;">
                  Contact details for follow-up:
                </p>
                <p style="margin: 0; color: ${BRAND.text}; font-size: 13px; line-height: 1.6;">
                  ${escapeHtml(BUSINESS.name)}<br />
                  ${escapeHtml(BUSINESS.address)}<br />
                  <a href="tel:+13207260822" style="color: #f87171;">${escapeHtml(BUSINESS.phone)}</a> •
                  <a href="mailto:${BUSINESS.email}" style="color: #f87171;">${BUSINESS.email}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}
