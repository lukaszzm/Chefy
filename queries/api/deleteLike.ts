export const deleteLike = async (recipeId: string) => {
  const response = await fetch(`/api/recipes/likes/${recipeId}`, {
    method: "DELETE",
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
