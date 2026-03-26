import { z } from "zod";

const honeypot = z.string().optional().default("");

export const newsletterSchema = z.object({
  email: z.email("Please enter a valid email address"),
  sourcePage: z.string().optional(),
  website: honeypot,
});

export const contactSchema = z.object({
  name: z.string().min(2, "Please provide your name"),
  email: z.email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Please provide more detail"),
  sourcePage: z.string().optional(),
  website: honeypot,
});

export const appointmentSchema = z.object({
  name: z.string().min(2, "Please provide your name"),
  email: z.email("Please enter a valid email address"),
  phone: z.string().optional(),
  consultationType: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  notes: z.string().optional(),
  website: honeypot,
});

export const inquirySchema = z.object({
  type: z.enum(["CONTACT", "CUSTOM", "RESERVE_DIAMOND", "SOURCE_DIAMOND", "BUILD_REQUEST", "GENERAL"]),
  name: z.string().min(2, "Please provide your name"),
  email: z.email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().optional(),
  category: z.string().optional(),
  sourcePage: z.string().optional(),
  budgetMinTHB: z.coerce.number().int().nonnegative().optional(),
  budgetMaxTHB: z.coerce.number().int().nonnegative().optional(),
  diamondId: z.string().optional(),
  buildDraftId: z.string().optional(),
  metadataJson: z.string().optional(),
  website: honeypot,
});

export const buildDraftSchema = z.object({
  customerName: z.string().min(2, "Please provide your name"),
  customerEmail: z.email("Please enter a valid email address"),
  customerPhone: z.string().optional(),
  diamondId: z.string().min(1, "Please choose a diamond"),
  settingId: z.string().min(1, "Please choose a setting"),
  selectedMetal: z.string().min(1, "Please choose a metal"),
  ringSize: z.string().optional(),
  notes: z.string().optional(),
  estimatedPriceTHB: z.coerce.number().int().nonnegative().optional(),
  website: honeypot,
});

export function isSpam(honeypotValue: string | undefined) {
  return typeof honeypotValue === "string" && honeypotValue.trim().length > 0;
}

export function formatZodError(error: z.ZodError) {
  return error.issues.map((issue) => issue.message).join(" ");
}
