import { describe, it, expect, beforeEach } from "vitest";
import { newsletterSchema, contactSchema, appointmentSchema, inquirySchema, isSpam } from "@/lib/validation";

describe("Newsletter Schema", () => {
  it("accepts valid email and sourcePage", () => {
    const result = newsletterSchema.safeParse({ email: "user@example.com", sourcePage: "/home" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = newsletterSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("accepts empty sourcePage", () => {
    const result = newsletterSchema.safeParse({ email: "user@example.com" });
    expect(result.success).toBe(true);
  });
});

describe("Contact Schema", () => {
  it("accepts valid contact form", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: "Hello, I am interested in your diamonds.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects name shorter than 2 chars", () => {
    const result = contactSchema.safeParse({ name: "J", email: "j@j.com", message: "Hello there!" });
    expect(result.success).toBe(false);
  });

  it("rejects message shorter than 10 chars", () => {
    const result = contactSchema.safeParse({ name: "John", email: "john@example.com", message: "Hi" });
    expect(result.success).toBe(false);
  });
});

describe("Appointment Schema", () => {
  it("accepts valid appointment request", () => {
    const result = appointmentSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      consultationType: "Showroom Visit",
      preferredDate: "2026-05-01",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = appointmentSchema.safeParse({ name: "Jane", email: "notemail" });
    expect(result.success).toBe(false);
  });
});

describe("Inquiry Schema", () => {
  it("accepts valid CUSTOM inquiry", () => {
    const result = inquirySchema.safeParse({
      type: "CUSTOM",
      name: "Buyer",
      email: "buyer@example.com",
      message: "I would like a custom ring.",
    });
    expect(result.success).toBe(true);
  });

  it("accepts valid RESERVE_DIAMOND inquiry", () => {
    const result = inquirySchema.safeParse({
      type: "RESERVE_DIAMOND",
      name: "Buyer",
      email: "buyer@example.com",
      diamondId: "diamond-123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid inquiry type", () => {
    const result = inquirySchema.safeParse({
      type: "INVALID_TYPE",
      name: "Buyer",
      email: "buyer@example.com",
    });
    expect(result.success).toBe(false);
  });
});

describe("isSpam", () => {
  it("returns true when honeypot field has content", () => {
    expect(isSpam("http://spam-link.com")).toBe(true);
  });

  it("returns false when honeypot field is empty or undefined", () => {
    expect(isSpam("")).toBe(false);
    expect(isSpam(undefined)).toBe(false);
  });
});
