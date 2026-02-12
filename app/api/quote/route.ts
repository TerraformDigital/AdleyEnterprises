import { NextResponse } from "next/server";
import { Resend } from "resend";

import { quoteRequestSchema } from "@/lib/quote-schema";

const quoteToEmail = process.env.QUOTE_TO_EMAIL || "sales@adleyenterprises.com";
const quoteFromEmail = process.env.QUOTE_FROM_EMAIL || "quotes@adleyenterprisesllc.com";
const resendApiKey = process.env.RESEND_API_KEY;

export async function POST(request: Request) {
  const payload = await request.json();
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
        message:
          "Quote request captured, but email provider is not configured yet. Set RESEND_API_KEY before production launch."
      },
      { status: 200 }
    );
  }

  const resend = new Resend(resendApiKey);

  try {
    await resend.emails.send({
      from: quoteFromEmail,
      to: [quoteToEmail],
      subject: `New Quote Request: ${data.name} (${data.city})`,
      replyTo: data.email,
      text: [
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
      ].join("\n")
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
