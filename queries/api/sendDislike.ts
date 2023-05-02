export const sendDislike = async (recipeId: string) => {
  const response = await fetch(`/api/recipes/dislikes/${recipeId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error();
  }

  return data;
};
