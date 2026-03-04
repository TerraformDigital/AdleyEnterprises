import { NextResponse } from "next/server";
import { Resend } from "resend";

import { buildQuoteEmailHtml, buildQuoteEmailText } from "@/lib/email/quote-email-template";
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
  const emailText = buildQuoteEmailText(data);
  const emailHtml = buildQuoteEmailHtml(data);

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
