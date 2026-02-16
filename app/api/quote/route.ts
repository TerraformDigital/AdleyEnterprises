import { NextResponse } from "next/server";
import { Resend } from "resend";

import { quoteRequestSchema } from "@/lib/quote-schema";

const quoteToEmail = process.env.QUOTE_TO_EMAIL || "sales@adleyenterprises.com";
const quoteFromEmail = process.env.QUOTE_FROM_EMAIL || "Adley Enterprises <onboarding@resend.dev>";
const resendApiKey = process.env.RESEND_API_KEY;

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        message: "Invalid request payload."
      },
      { status: 400 }
    );
  }

  const parsed = quoteRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid quote request. Please check all required fields."
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (data.companyWebsite) {
    return NextResponse.json({ message: "Quote request received." }, { status: 200 });
  }

  if (!resendApiKey) {
    return NextResponse.json(
      {
        message: "Quote form is not configured yet. Please call +1 (320) 726-0822 or email sales@adleyenterprises.com."
      },
      { status: 503 }
    );
  }

  const resend = new Resend(resendApiKey);

  const emailText = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `City: ${data.city}`,
    `Boat Make/Model: ${data.boatMakeModel}`,
    `Service Needed: ${data.serviceNeeded}`,
    `Damage Type: ${data.damageType}`,
    `Preferred Contact: ${data.preferredContact}`,
    `Photo Links: ${data.photoLinks || "N/A"}`,
    `Additional Notes: ${data.message || "N/A"}`
  ].join("\n");

  const emailHtml = `
    <h2>New Quote Request</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>City:</strong> ${escapeHtml(data.city)}</p>
    <p><strong>Boat Make/Model:</strong> ${escapeHtml(data.boatMakeModel)}</p>
    <p><strong>Service Needed:</strong> ${escapeHtml(data.serviceNeeded)}</p>
    <p><strong>Damage Type:</strong> ${escapeHtml(data.damageType)}</p>
    <p><strong>Preferred Contact:</strong> ${escapeHtml(data.preferredContact)}</p>
    <p><strong>Photo Links:</strong> ${escapeHtml(data.photoLinks || "N/A")}</p>
    <p><strong>Additional Notes:</strong><br />${escapeHtml(data.message || "N/A").replace(/\n/g, "<br />")}</p>
  `;

  try {
    await resend.emails.send({
      from: quoteFromEmail,
      to: [quoteToEmail],
      subject: `New Quote Request: ${data.name} (${data.city})`,
      replyTo: data.email,
      text: emailText,
      html: emailHtml
    });

    return NextResponse.json({ message: "Quote request sent successfully." }, { status: 200 });
  } catch (error) {
    console.error("Quote email failed", error);
    return NextResponse.json(
      {
        message: "Unable to send quote request right now. Please call +1 (320) 726-0822."
      },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
