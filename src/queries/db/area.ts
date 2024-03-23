import { prisma } from "@/lib/prisma";

export const getAllAreas = async () => await prisma.area.findMany();

export const getPreferredAreas = async (email: string) =>
  await prisma.area.findMany({
    where: {
      User: {
        some: {
          email,
        },
      },
    },
  });
