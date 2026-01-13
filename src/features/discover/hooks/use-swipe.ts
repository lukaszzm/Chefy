import { useCallback, useRef } from "react";

import type { PanInfo } from "motion/react";
import { useMotionValue, useTransform } from "motion/react";
import type { SwipeDirection } from "@/features/discover/config/swipe";
import { DRAG_LIMIT, SwipeDirections } from "@/features/discover/config/swipe";
import { BackgroundColors } from "@/features/discover/config/bg-colors";

interface UseSwipeHookProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onChangeSwipeDirection: (direction: SwipeDirection) => void;
}

export function useSwipe({ onSwipeLeft, onSwipeRight, onChangeSwipeDirection }: UseSwipeHookProps) {
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-DRAG_LIMIT, DRAG_LIMIT], [-22.5, 22.5]);
  const background = useTransform(
    x,
    [-DRAG_LIMIT, 0, DRAG_LIMIT],
    [BackgroundColors.Dislike, BackgroundColors.Default, BackgroundColors.Like]
  );

  const swipeEndHandler = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const swipeBoundary = DRAG_LIMIT / 2;

      if (info.offset.x > swipeBoundary) {
        return onSwipeRight();
      }

      if (info.offset.x < -swipeBoundary) {
        return onSwipeLeft();
      }
    },
    [onSwipeLeft, onSwipeRight]
  );

  const swipeHandler = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x > 0) {
        return onChangeSwipeDirection(SwipeDirections.Right);
      }

      onChangeSwipeDirection(SwipeDirections.Left);
    },
    [onChangeSwipeDirection]
  );

  return {
    constraintsRef,
    x,
    rotate,
    background,
    swipeEndHandler,
    swipeHandler,
  };
}
