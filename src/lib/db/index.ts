import { PrismaClient } from "@prisma/client";

// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
declare global {
  var prisma: PrismaClient | undefined;
}

// biome-ignore lint/suspicious/noRedeclare: This is best practice!
export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export * from "@prisma/client";
