"use client";

import type { ReactNode } from "react";

import { motion } from "framer-motion";

import { SwipeVariant } from "@/features/swipe/config";
import { useSwipe } from "@/features/swipe/hooks/use-swipe";

interface SwiperProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  changeVariant: (_variant: SwipeVariant) => void;
  variant: SwipeVariant;
  children: ReactNode;
}

export const Swiper = ({ children, onSwipeLeft, onSwipeRight, changeVariant, variant }: SwiperProps) => {
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
        className="h-full"
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.3}
        exit={{
          x: isLike ? 400 : -400,
          opacity: 0,
          transition: { duration: 0.4 },
        }}
        style={{ x, rotate }}
        drag
        onDragEnd={swipeEndHandler}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
