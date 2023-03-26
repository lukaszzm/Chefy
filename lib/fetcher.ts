export const fetcher = async <JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> => {
  const res = await fetch(input, init);

  if (!res.ok) throw new Error("An error occurred while fetching the data.");

  return res.json();
};
