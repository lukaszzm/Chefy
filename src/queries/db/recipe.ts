import type { Area, Category } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const getLikedRecipes = async (email: string, page: number) =>
  await prisma.$transaction([
    prisma.recipe.count({
      where: {
        likers: {
          some: {
            email,
          },
        },
      },
    }),
    prisma.recipe.findMany({
      skip: (page - 1) * 5,
      take: 5,
      where: {
        likers: {
          some: {
            email,
          },
        },
      },
      include: {
        category: true,
        area: true,
      },
    }),
  ]);

export const getRandomRecipes = async (email: string, preferredAreas: Area[], preferredCategories: Category[]) =>
  await prisma.recipe.findMany({
    take: 10,
    where: {
      areaId: { in: preferredAreas.map((el) => el.id) },
      categoryId: { in: preferredCategories.map((el) => el.id) },
      AND: [
        {
          NOT: {
            likers: {
              some: {
                email,
              },
            },
          },
        },
        {
          NOT: {
            dislikers: {
              some: {
                email,
              },
            },
          },
        },
      ],
    },
    include: {
      category: true,
      area: true,
    },
  });

export const likeRecipe = async (email: string, id: string) =>
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      likedRecipes: {
        connect: {
          id,
        },
      },
    },
  });

export const unlikeRecipe = async (email: string, id: string) =>
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      likedRecipes: {
        disconnect: {
          id,
        },
      },
    },
  });

export const dislikeRecipe = async (email: string, id: string) =>
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      dislikedRecipes: {
        connect: {
          id,
        },
      },
    },
  });
