export type Recipe = {
  id: string;
  title: string;
  imageSrc: string;
  ingredients: string[];
  instructions: string;
  category: Category;
  area: Area;
};

export type Area = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
};

export type SuggestedRecipe = {
  recipe: Omit<Recipe, "category" | "area">;
  category: Category;
  area: Area;
};
