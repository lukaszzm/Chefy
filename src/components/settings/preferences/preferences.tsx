import { updatePreferredAreas } from "@/actions/user/update-preferred-areas";
import { updatePreferredCategories } from "@/actions/user/update-preferred-categories";
import { PreferencesForm } from "@/components/settings/preferences/preferences-form";
import { SettingsContainer } from "@/components/settings/settings-container";

const mockedCategories = [
  { id: "clcjo266a0002pwmvkgxh4ody", name: "Beef", selected: true },
  { id: "clcjo266a0003pwmv1k1c0cfk", name: "Breakfast", selected: true },
  { id: "clcjo266a0004pwmv94hgx0sf", name: "Chicken", selected: false },
  { id: "clcjo266a0005pwmvhj58fchr", name: "Dessert", selected: false },
  { id: "clcjo266a0006pwmvdxgh2gja", name: "Goat", selected: false },
  { id: "clcjo266a0007pwmvytn7z6du", name: "Lamb", selected: false },
  { id: "clcjo266a0008pwmvbpyi5qia", name: "Miscellaneous", selected: false },
  { id: "clcjo266a0009pwmvsd1k1sqy", name: "Pasta", selected: false },
  { id: "clcjo266a000apwmvys0oohx9", name: "Pork", selected: false },
  { id: "clcjo266a000bpwmvqc15k33w", name: "Seafood", selected: false },
  { id: "clcjo266a000cpwmvmy4ipt9n", name: "Side", selected: false },
  { id: "clcjo266a000dpwmvqw0ubxf1", name: "Starter", selected: false },
  { id: "clcjo266a000epwmvha2i00tt", name: "Vegan", selected: false },
  { id: "clcjo266a000fpwmvaavegohn", name: "Vegetarian", selected: false },
];

const mockedAreas = [
  { id: "clcjo266e000gpwmvkz48zp8z", name: "American", selected: false },
  { id: "clcjo266e000hpwmvozehe7t5", name: "British", selected: false },
  { id: "clcjo266e000ipwmv4lzh3jx4", name: "Canadian", selected: false },
  { id: "clcjo266e000jpwmvhl5s4jag", name: "Chinese", selected: false },
  { id: "clcjo266e000kpwmvlwdz1nz0", name: "Croatian", selected: false },
  { id: "clcjo266e000lpwmvm5k5bm9e", name: "Dutch", selected: false },
  { id: "clcjo266e000mpwmvmm7rr83q", name: "Egyptian", selected: false },
  { id: "clcjo266e000npwmvvsnxm3dy", name: "French", selected: false },
  { id: "clcjo266e000opwmv533fjb6i", name: "Greek", selected: false },
  { id: "clcjo266e000ppwmv0yxrln2f", name: "Indian", selected: false },
  { id: "clcjo266e000qpwmv8pw0w3vk", name: "Irish", selected: false },
  { id: "clcjo266e000rpwmvjjsl9yf9", name: "Italian", selected: false },
  { id: "clcjo266e000spwmvyoeqgfnz", name: "Jamaican", selected: false },
  { id: "clcjo266e000tpwmvnavht0wg", name: "Japanese", selected: false },
  { id: "clcjo266e000upwmvost1ww0d", name: "Kenyan", selected: false },
  { id: "clcjo266e000vpwmvqexy0d39", name: "Malaysian", selected: false },
  { id: "clcjo266e000wpwmvc8rikbaw", name: "Mexican", selected: false },
  { id: "clcjo266e000xpwmv7yllix8i", name: "Moroccan", selected: false },
  { id: "clcjo266e000ypwmvpzohg34r", name: "Polish", selected: false },
  { id: "clcjo266e000zpwmvm6a7wfao", name: "Portuguese", selected: false },
  { id: "clcjo266e0010pwmvaz7hz4o3", name: "Russian", selected: false },
  { id: "clcjo266e0011pwmv53fzbcli", name: "Spanish", selected: false },
  { id: "clcjo266e0012pwmvc3ioq01i", name: "Thai", selected: false },
  { id: "clcjo266e0013pwmvf1t0gmma", name: "Tunisian", selected: false },
  { id: "clcjo266f0014pwmv2nsgak94", name: "Turkish", selected: false },
  { id: "clcjo266f0015pwmvhfju9qrw", name: "Unknown", selected: false },
  { id: "clcjo266f0016pwmvzhp3xnv8", name: "Vietnamese", selected: false },
];

// TODO: Add default data for categories and areas from the database instead of mocked data
export const Preferences = () => {
  return (
    <div className="space-y-3">
      <SettingsContainer subtitle="Categories">
        <PreferencesForm
          actionOnSubmit={updatePreferredCategories}
          defaultData={mockedCategories}
          keyName="categoryId"
        />
      </SettingsContainer>
      <SettingsContainer subtitle="Areas">
        <PreferencesForm actionOnSubmit={updatePreferredAreas} defaultData={mockedAreas} keyName="areaId" />
      </SettingsContainer>
    </div>
  );
};
