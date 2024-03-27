import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";

export const updateName = async (email: string, name: string) =>
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      name,
    },
  });

export const updatePreferredCategories = async (email: string, preferredCategories: string[]) => {
  const allCategoriesIds = await prisma.category.findMany({
    select: { id: true },
  });

  const notPreferredCategories = allCategoriesIds.filter((el: { id: string }) => !preferredCategories.includes(el.id));

  return await prisma.user.update({
    where: {
      email,
    },
    data: {
      preferredCategories: {
        connect: preferredCategories.map((el) => ({ id: el })) || [],
        disconnect: notPreferredCategories.map((el) => ({ id: el.id })) || [],
      },
    },
  });
};

export const updatePreferredAreas = async (email: string, preferredAreas: string[]) => {
  const allAreasIds = await prisma.area.findMany({
    select: { id: true },
  });

  const notPreferredAreas = allAreasIds.filter((el: { id: string }) => !preferredAreas.includes(el.id));

  return await prisma.user.update({
    where: {
      email,
    },
    data: {
      preferredAreas: {
        connect: preferredAreas.map((el) => ({ id: el })) || [],
        disconnect: notPreferredAreas.map((el) => ({ id: el.id })) || [],
      },
    },
  });
};

export const updatePassword = async (email: string, newPassword: string) =>
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: bcrypt.hashSync(newPassword, 10),
    },
  });

export const getUser = async (email: string) =>
  await prisma.user.findUnique({
    where: { email },
  });

export const getPreferences = async (email: string) =>
  await prisma.user.findUnique({
    where: { email },
    select: {
      preferredCategories: true,
      preferredAreas: true,
    },
  });

export const createUser = async (name: string, email: string, password: string) => {
  const allCategoriesIds = await prisma.category.findMany({
    select: { id: true },
  });
  const allAreasIds = await prisma.area.findMany({
    select: { id: true },
  });

  return await prisma.user.create({
    data: {
      email,
      name,
      password: bcrypt.hashSync(password, 10),
      preferredCategories: {
        connect: allCategoriesIds,
      },
      preferredAreas: {
        connect: allAreasIds,
      },
    },
  });
};
