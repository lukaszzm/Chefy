export function getInfiniteRecipesQueryKey(userId: string): ReadonlyArray<string> {
  return ["infinite-recipes", userId];
}
