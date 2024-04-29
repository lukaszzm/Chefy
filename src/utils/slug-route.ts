export const slugRoute = (base: string, slugs: Record<string, string>): string => {
  Object.entries(slugs).forEach(([key, value]) => {
    base = base.replace(`:${key}`, value);
  });

  return base;
};
