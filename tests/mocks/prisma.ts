import { vi } from "vitest";

// Mock Prisma
const mockPrismaClient = {
  newsletterSubscriber: {
    upsert: vi.fn().mockResolvedValue({ id: "1", email: "test@test.com" }),
  },
  inquiry: {
    create: vi.fn().mockResolvedValue({ id: "1" }),
  },
  appointment: {
    create: vi.fn().mockResolvedValue({ id: "1" }),
  },
  certificateRecord: {
    findUnique: vi.fn().mockResolvedValue(null),
  },
  buildDraft: {
    create: vi.fn().mockResolvedValue({ id: "draft-1" }),
  },
  product: { findMany: vi.fn().mockResolvedValue([]) },
  collection: { findMany: vi.fn().mockResolvedValue([]) },
  diamond: { findMany: vi.fn().mockResolvedValue([]) },
  $transaction: vi.fn().mockImplementation((cb) => cb(mockPrismaClient)),
};

vi.mock("@/lib/prisma", () => ({
  prisma: mockPrismaClient,
}));

// Mock email
vi.mock("@/lib/email", () => ({
  sendBusinessNotification: vi.fn().mockResolvedValue(undefined),
  sendCustomerConfirmation: vi.fn().mockResolvedValue(undefined),
}));

export { mockPrismaClient };
