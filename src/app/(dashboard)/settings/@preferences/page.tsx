import { UpdateAreaPreferencesForm, UpdateCategoryPreferencesForm } from "@/features/settings";
import { authUser } from "@/lib/auth";
import { getAllAreas, getPreferredAreas } from "@/lib/db/queries/area";
import { getAllCategories, getPreferredCategories } from "@/lib/db/queries/category";

export default async function PreferencesPage() {
  const { id } = await authUser();

  const [allCategories, preferredCategories, allAreas, preferredAreas] = await Promise.all([
    getAllCategories(),
    getPreferredCategories(id),
    getAllAreas(),
    getPreferredAreas(id),
  ]);

  return (
    <>
      <UpdateCategoryPreferencesForm allCategories={allCategories} preferredCategories={preferredCategories} />
      <UpdateAreaPreferencesForm allAreas={allAreas} preferredAreas={preferredAreas} />
    </>
  );
}
