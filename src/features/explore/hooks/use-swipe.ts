import { useCallback, useRef } from "react";

import type { PanInfo } from "framer-motion";
import { useMotionValue, useTransform } from "framer-motion";

import { BackgroundColors, DragLimit, SwipeVariant } from "@/features/explore/config";

interface UseSwipeHookProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  changeVariant: (variant: SwipeVariant) => void;
}

export const useSwipe = ({ onSwipeLeft, onSwipeRight, changeVariant }: UseSwipeHookProps) => {
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-DragLimit, DragLimit], [-22.5, 22.5]);
  const background = useTransform(
    x,
    [-DragLimit, 0, DragLimit],
    [BackgroundColors.Dislike, BackgroundColors.Default, BackgroundColors.Like]
  );

  const swipeEndHandler = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const swipeBoundary = DragLimit / 2;

      if (info.offset.x > swipeBoundary) {
        onSwipeRight();
      } else if (info.offset.x < -swipeBoundary) {
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
