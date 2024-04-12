import { useCallback, useRef } from "react";

import type { PanInfo } from "framer-motion";
import { useMotionValue, useTransform } from "framer-motion";

import { SwipeVariant } from "@/config/swipe-variant";

const DRAG_LIMIT = 300;

const BG_COLORS = {
  Like: "#4ade807e",
  Default: "#FAFAFA7e",
  Dislike: "#f871717e",
} as const satisfies Record<string, string>;

interface UseSwipeHookProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  changeVariant: (variant: SwipeVariant) => void;
}

export const useSwipe = ({ onSwipeLeft, onSwipeRight, changeVariant }: UseSwipeHookProps) => {
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-DRAG_LIMIT, DRAG_LIMIT], [-22.5, 22.5]);
  const background = useTransform(
    x,
    [-DRAG_LIMIT, 0, DRAG_LIMIT],
    [BG_COLORS.Dislike, BG_COLORS.Default, BG_COLORS.Like]
  );

  const swipeEndHandler = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x > DRAG_LIMIT) {
        onSwipeRight();
      } else if (info.offset.x < -DRAG_LIMIT) {
        onSwipeLeft();
      }
    },
    [onSwipeLeft, onSwipeRight]
  );

  const swipeHandler = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x > 0) {
        changeVariant(SwipeVariant.Like);
      } else {
        changeVariant(SwipeVariant.Dislike);
      }
    },
    [changeVariant]
  );

  return {
    constraintsRef,
    x,
    rotate,
    background,
    swipeEndHandler,
    swipeHandler,
  };
};
