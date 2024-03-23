import type { Area, Category } from "@/interfaces";
import { Areas } from "../Areas";
import { Categories } from "../Categories";

interface PreferencesProps {
  allCategories: Category[];
  allAreas: Area[];
  defaultCategories: Category[];
  defaultAreas: Area[];
}

export const Preferences = ({
  allCategories,
  allAreas,
  defaultCategories,
  defaultAreas,
}: PreferencesProps) => {
  return (
    <>
      <Categories
        allCategories={allCategories}
        checkedByDefaultCategories={defaultCategories}
      />
      <Areas allAreas={allAreas} checkedByDefaultAreas={defaultAreas} />
    </>
  );
};
