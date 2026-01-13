export const SWIPE_DURATION = 0.4;
export const SWIPE_ELASTICITY = 0.3;
export const SWIPE_OFFSET = 400;

export const DRAG_LIMIT = 300;

export const SwipeDirections = {
  Right: "right",
  Left: "left",
} as const satisfies Record<string, string>;

export type SwipeDirection = (typeof SwipeDirections)[keyof typeof SwipeDirections];
