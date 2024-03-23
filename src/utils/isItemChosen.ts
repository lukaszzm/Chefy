import type { Category, Area } from "@/interfaces";

export const isItemChosen = (
  el: Category | Area,
  list: Category[] | Area[]
) => {
  for (let category of list) {
    if (category.id === el.id) return true;
  }

  return false;
};
