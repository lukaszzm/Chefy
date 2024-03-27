import { Areas } from "@/components/Settings/Areas";
import { Categories } from "@/components/Settings/Categories";
import type { Area, Category } from "@/interfaces";

interface PreferencesProps {
  allCategories: Category[];
  allAreas: Area[];
  defaultCategories: Category[];
  defaultAreas: Area[];
}

export const Preferences = ({ allCategories, allAreas, defaultCategories, defaultAreas }: PreferencesProps) => {
  return (
    <>
      <Categories allCategories={allCategories} checkedByDefaultCategories={defaultCategories} />
      <Areas allAreas={allAreas} checkedByDefaultAreas={defaultAreas} />
    </>
  );
};
