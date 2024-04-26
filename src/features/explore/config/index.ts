export const DragLimit = 300;

export const BackgroundColors = {
  Like: "#4ade807e",
  Default: "#FAFAFA7e",
  Dislike: "#f871717e",
} as const satisfies Record<string, string>;

export type BackgroundColors = (typeof BackgroundColors)[keyof typeof BackgroundColors];

export const SwipeVariant = {
  Like: "like",
  Dislike: "dislike",
} as const satisfies Record<string, string>;

export type SwipeVariant = (typeof SwipeVariant)[keyof typeof SwipeVariant];
