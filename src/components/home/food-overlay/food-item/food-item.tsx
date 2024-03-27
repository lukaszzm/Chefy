import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const foodItemVariants = cva("absolute size-16 hidden place-items-center p-2 border rounded-lg hidden xl:grid", {
  variants: {
    position: {
      topLeft: "top-0 left-0",
      topRight: "top-0 right-0",
      bottomRight: "top-48 right-0",
      bottomLeft: "top-48 left-0",
    },
    rotation: {
      right: "rotate-12",
      left: "-rotate-12",
    },
    color: {
      orange: "text-orange-600 border-orange-400 bg-orange-400/20",
      blue: "text-blue-600 border-blue-400 bg-blue-400/20",
      green: "text-green-600 border-green-400 bg-green-400/20",
      yellow: "text-yellow-600 border-yellow-400 bg-yellow-400/20",
    },
  },
  defaultVariants: {
    position: "topLeft",
    rotation: "right",
    color: "orange",
  },
});

interface FoodItemProps extends VariantProps<typeof foodItemVariants> {
  icon: React.ReactNode;
}

export const FoodItem = ({ icon, ...props }: FoodItemProps) => {
  return <span className={cn(foodItemVariants(props))}>{icon}</span>;
};
