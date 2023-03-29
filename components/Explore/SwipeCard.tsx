import { motion } from "framer-motion";
import { useState } from "react";

interface ISwipeCardProps {
  children: React.ReactNode;
}

export const SwipeCard: React.FC<ISwipeCardProps> = ({ children }) => {
  const [bgOpacity, setBgOpacity] = useState(0);
  const [bgColor, setBgColor] = useState<"green" | "red">("red");

  const backgroundStyle =
    bgColor === "green"
      ? { backgroundColor: `rgb(74, 222, 128, ${bgOpacity})` }
      : { backgroundColor: `rgb(248, 113, 113, ${bgOpacity})` };

  return (
    <motion.div
      style={backgroundStyle}
      className="w-full h-full min-h-screen m-0 flex justify-center items-center"
    >
      <motion.div
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        dragElastic={0.3}
        className="bg-gray-100"
        onDragEnd={(event, info) => {
          if (info.offset.x > 100) {
            console.log("LIKE");
          } else if (info.offset.x < -100) {
            console.log("DISLIKE");
          }
          setBgOpacity(0);
        }}
        onDrag={(event, info) => {
          if (info.offset.x > 0) {
            setBgColor("green");
          } else {
            setBgColor("red");
          }
          setBgOpacity(Math.abs(info.offset.x) / 2000);
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
