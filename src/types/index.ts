export type Recipe = {
  id: string;
  title: string;
  imageSrc: string;
  ingredients: string[];
  instructions: string;
  categoryId: string;
  areaId: string;
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
  recipe: Recipe;
  category: Category;
  area: Area;
};

export type ActionError = {
  ok: false;
  error: string;
};

export type ActionSuccess<T> = {
  ok: true;
  data: T;
};

export type ActionResponse<T> = ActionError | ActionSuccess<T>;
