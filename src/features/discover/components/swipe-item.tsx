"use client";

import { motion } from "motion/react";

import { useSwipe } from "@/features/discover/hooks/use-swipe";
import type { SwipeDirection } from "@/features/discover/config/swipe";
import { SWIPE_DURATION, SWIPE_ELASTICITY, SWIPE_OFFSET, SwipeDirections } from "@/features/discover/config/swipe";

interface SwipeItemProps extends React.PropsWithChildren {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onChangeSwipeDirection: (direction: SwipeDirection) => void;
  direction: SwipeDirection;
  isDragEnabled: boolean;
  zIndex: number;
}

export function SwipeItem({
  children,
  onSwipeLeft,
  onSwipeRight,
  onChangeSwipeDirection,
  direction,
  isDragEnabled,
  zIndex,
}: SwipeItemProps) {
  const { constraintsRef, background, x, rotate, swipeHandler, swipeEndHandler } = useSwipe({
    onSwipeLeft,
    onSwipeRight,
    onChangeSwipeDirection,
  });

  const isLikeVariant = direction === SwipeDirections.Right;

  return (
    <motion.div
      className="col-start-1 row-start-1 grid overflow-hidden sm:place-content-center"
      animate={{ opacity: 1, scale: 1, zIndex, transition: { duration: SWIPE_DURATION } }}
      exit={{ opacity: 0, zIndex: 100, transition: { duration: SWIPE_DURATION } }}
      ref={constraintsRef}
      style={{ background }}
    >
      <motion.div
        animate={{ scale: 1 }}
        drag={isDragEnabled}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={SWIPE_ELASTICITY}
        exit={{
          x: isLikeVariant ? SWIPE_OFFSET : -SWIPE_OFFSET,
          opacity: 0,
          transition: { duration: SWIPE_DURATION },
        }}
        style={{ x, rotate }}
        onDrag={swipeHandler}
        onDragEnd={swipeEndHandler}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
