import { prisma } from "@/lib/prisma";

export const getAllCategories = async () => await prisma.category.findMany();

export const getPreferredCategories = async (email: string) =>
  await prisma.category.findMany({
    where: {
      User: {
        some: {
          email,
        },
      },
    },
  });
