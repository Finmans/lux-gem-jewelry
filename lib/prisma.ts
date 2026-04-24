import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

// Lazy instantiation — only created when first accessed, not at module load time
function getPrismaClient(): PrismaClient {
  if (global.__prisma) return global.__prisma;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL environment variable is not set. " +
      "Please configure your database connection string."
    );
  }

  const client = new PrismaClient({
    datasources: { db: { url } },
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  if (process.env.NODE_ENV !== "production") {
    global.__prisma = client;
  }

  return client;
}

// Export a proxy that lazily initializes on first property access
// This avoids PrismaClient being instantiated at module load (build) time
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    const value = (client as any)[prop];
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});
// saved Fri Mar 27 03:25:47 +07 2026
