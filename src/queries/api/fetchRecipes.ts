export const fetchRecipes = async () => {
  const response = await fetch("/api/recipes/random");
  const data = await response.json();

  if (!response.ok) {
    throw new Error();
  }

  return data;
};
