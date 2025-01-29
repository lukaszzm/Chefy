"use client";

import type { ReactNode } from "react";

import { motion } from "framer-motion";

import { SwipeVariant } from "@/features/explore/config";
import { useSwipe } from "@/features/explore/hooks/use-swipe";

interface SwipeItemProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  changeVariant: (_variant: SwipeVariant) => void;
  variant: SwipeVariant;
  children: ReactNode;
  isDragEnabled: boolean;
}

export const SwipeItem = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  changeVariant,
  variant,
  isDragEnabled,
}: SwipeItemProps) => {
  const { constraintsRef, background, x, rotate, swipeEndHandler } = useSwipe({
    onSwipeLeft,
    onSwipeRight,
    changeVariant,
  });

  const isLike = variant === SwipeVariant.Like;

  return (
    <motion.div
      className="col-start-1 row-start-1 grid overflow-hidden sm:place-content-center"
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      ref={constraintsRef}
      style={{ background }}
    >
      <motion.div
        animate={{ scale: 1 }}
        drag={isDragEnabled}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.3}
        exit={{
          x: isLike ? 400 : -400,
          opacity: 0,
          transition: { duration: 0.4 },
        }}
        style={{ x, rotate }}
        onDragEnd={swipeEndHandler}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
