import { routes } from "@/config/routes";
import { UpdateAreaPreferencesForm } from "@/features/settings/components/preferences/update-area-preferences-form";
import { UpdateCategoryPreferencesForm } from "@/features/settings/components/preferences/update-category-preferences-form";
import { getAuthSession } from "@/lib/auth/utils";
import { getAllAreas, getPreferredAreas } from "@/lib/db/queries/area";
import { getAllCategories, getPreferredCategories } from "@/lib/db/queries/category";
import { redirect } from "next/navigation";

export default async function PreferencesPage() {
  const session = await getAuthSession();

  if (!session) {
    return redirect(routes.signIn);
  }

  const [allCategories, preferredCategories, allAreas, preferredAreas] = await Promise.all([
    getAllCategories(),
    getPreferredCategories(session.user.id),
    getAllAreas(),
    getPreferredAreas(session.user.id),
  ]);

  return (
    <>
      <UpdateCategoryPreferencesForm allCategories={allCategories} preferredCategories={preferredCategories} />
      <UpdateAreaPreferencesForm allAreas={allAreas} preferredAreas={preferredAreas} />
    </>
  );
}
