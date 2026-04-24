import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockPrismaClient } from "../mocks/prisma";

// Re-import mocks so they are active
vi.mock("@/lib/prisma", () => ({
  prisma: mockPrismaClient,
}));

vi.mock("@/lib/email", () => ({
  sendBusinessNotification: vi.fn().mockResolvedValue(undefined),
  sendCustomerConfirmation: vi.fn().mockResolvedValue(undefined),
}));

// Import route handlers directly
import { POST as newsletterPost } from "@/app/api/newsletter/route";
import { POST as contactPost } from "@/app/api/contact/route";
import { POST as appointmentPost } from "@/app/api/appointments/route";
import { GET as certificateGet } from "@/app/api/certificates/route";

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function makeGetRequest(url: string) {
  return new Request(url, { method: "GET" });
}

describe("POST /api/newsletter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 for missing email", async () => {
    const res = await newsletterPost(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it("returns 400 for invalid email format", async () => {
    const res = await newsletterPost(makeRequest({ email: "not-valid" }));
    expect(res.status).toBe(400);
  });

  it("returns 200 for valid subscription", async () => {
    const res = await newsletterPost(makeRequest({ email: "user@example.com" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it("blocks spam (honeypot filled)", async () => {
    const res = await newsletterPost(makeRequest({ email: "user@example.com", website: "http://spam.com" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    // Should not upsert when spam
    expect(mockPrismaClient.newsletterSubscriber.upsert).not.toHaveBeenCalled();
  });
});

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 for missing required fields", async () => {
    const res = await contactPost(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it("returns 400 for short name", async () => {
    const res = await contactPost(
      makeRequest({ name: "J", email: "j@j.com", message: "This is a valid message." })
    );
    expect(res.status).toBe(400);
  });

  it("returns 200 for valid contact form", async () => {
    const res = await contactPost(
      makeRequest({
        name: "John Doe",
        email: "john@example.com",
        message: "I would like to inquire about your diamond collection.",
      })
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });
});

describe("POST /api/appointments", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 for missing required fields", async () => {
    const res = await appointmentPost(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it("returns 200 for valid appointment request", async () => {
    const res = await appointmentPost(
      makeRequest({
        name: "Jane Doe",
        email: "jane@example.com",
        consultationType: "Showroom Visit",
        preferredDate: "2026-05-01",
      })
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });
});

describe("GET /api/certificates", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 when number param is missing", async () => {
    const res = await certificateGet(makeGetRequest("http://localhost/api/certificates"));
    expect(res.status).toBe(400);
  });

  it("returns found:false for unknown certificate", async () => {
    mockPrismaClient.certificateRecord.findUnique.mockResolvedValueOnce(null);
    const res = await certificateGet(makeGetRequest("http://localhost/api/certificates?number=UNKNOWN123"));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.found).toBe(false);
  });

  it("returns found:true with record data", async () => {
    mockPrismaClient.certificateRecord.findUnique.mockResolvedValueOnce({
      certificateNumber: "LUX-001",
      lab: "IGI",
      notes: "Excellent cut",
      diamond: { id: "d1", shape: "Round", carat: 1.5, color: "D", clarity: "VVS1", cut: "Excellent" },
    });
    const res = await certificateGet(makeGetRequest("http://localhost/api/certificates?number=LUX-001"));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.found).toBe(true);
    expect(json.record.certificateNumber).toBe("LUX-001");
    expect(json.record.lab).toBe("IGI");
  });
});
