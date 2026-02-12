import { z } from "zod";

export const quoteRequestSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(7).max(32),
  email: z.string().email(),
  city: z.string().min(2).max(120),
  boatMakeModel: z.string().min(2).max(160),
  serviceNeeded: z.string().min(2).max(160),
  damageType: z.string().min(2).max(200),
  preferredContact: z.enum(["phone", "email", "either"]),
  photoLinks: z.string().max(400).optional().default(""),
  message: z.string().max(2000).optional().default(""),
  companyWebsite: z.string().max(0).optional().default("")
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
