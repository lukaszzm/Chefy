export const BackgroundColors = {
  Like: "#4ade807e",
  Default: "#FAFAFA7e",
  Dislike: "#f871717e",
} as const satisfies Record<string, string>;

export type BackgroundColor = (typeof BackgroundColors)[keyof typeof BackgroundColors];
