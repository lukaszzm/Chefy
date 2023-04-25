import type { Area, Category } from "@/interfaces";
import { Areas } from "../Areas/Areas";
import { Categories } from "../Categories/Categories";

interface IPreferencesProps {
  allCategories: Category[];
  allAreas: Area[];
  defaultCategories: Category[];
  defaultAreas: Area[];
}

export const Preferences: React.FC<IPreferencesProps> = ({
  allCategories,
  allAreas,
  defaultCategories,
  defaultAreas,
}) => {
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
