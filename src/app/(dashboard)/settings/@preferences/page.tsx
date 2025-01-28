import { UpdateAreaPreferencesForm } from "@/features/settings/components/preferences/update-area-preferences-form";
import { UpdateCategoryPreferencesForm } from "@/features/settings/components/preferences/update-category-preferences-form";
import { getCurrentUser } from "@/lib/auth/session";
import { getAllAreas, getPreferredAreas } from "@/lib/db/queries/area";
import { getAllCategories, getPreferredCategories } from "@/lib/db/queries/category";

export default async function PreferencesPage() {
  const user = await getCurrentUser();

  const [allCategories, preferredCategories, allAreas, preferredAreas] = await Promise.all([
    getAllCategories(),
    getPreferredCategories(user.id),
    getAllAreas(),
    getPreferredAreas(user.id),
  ]);

  return (
    <>
      <UpdateCategoryPreferencesForm allCategories={allCategories} preferredCategories={preferredCategories} />
      <UpdateAreaPreferencesForm allAreas={allAreas} preferredAreas={preferredAreas} />
    </>
  );
}
