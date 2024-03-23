import { PrismaClient } from "@prisma/client";
declare let global: { prisma: PrismaClient };

const getPrisma = () => {
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    return global.prisma;
  }
};

export const prisma = getPrisma();
