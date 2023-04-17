import { PanInfo, motion, useMotionValue, useTransform } from "framer-motion";

const DRAG_LIMIT = 300;

const bgColors = {
  like: "#4ade80",
  default: "#f3f4f6",
  dislike: "#f87171",
};

interface ISwipeCardProps {
  children: React.ReactNode;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  isLike: boolean;
  setIsLike: (isLike: boolean) => void;
}

export const SwipeCard: React.FC<ISwipeCardProps> = ({
  children,
  onSwipeRight,
  onSwipeLeft,
  isLike,
  setIsLike,
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-DRAG_LIMIT, DRAG_LIMIT], [-22.5, 22.5]);
  const background = useTransform(
    x,
    [-DRAG_LIMIT, 0, DRAG_LIMIT],
    [bgColors.dislike, bgColors.default, bgColors.like]
  );

  const dragEndHandler = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > DRAG_LIMIT) {
      onSwipeRight();
    } else if (info.offset.x < -DRAG_LIMIT) {
      onSwipeLeft();
    }
  };

  const dragHandler = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 0) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  };

  return (
    <motion.div
      style={{ background }}
      className="w-full h-[calc(100svh-4rem)] sm:min-h-screen flex justify-center items-center fixed"
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <motion.div
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={dragEndHandler}
        onDrag={dragHandler}
        animate={{ scale: 1, opacity: 1 }}
        exit={{
          x: isLike ? 400 : -400,
          opacity: 0,
          transition: { duration: 0.4 },
        }}
        style={{ x, rotate }}
        className="w-full sm:w-auto"
        data-testid="swipe-card"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
