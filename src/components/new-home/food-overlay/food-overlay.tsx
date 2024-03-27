import { Donut, Pizza, Salad, Soup } from "lucide-react";

import { FoodItem } from "@/components/new-home/food-overlay/food-item";

export const FoodOverlay = () => {
  return (
    <>
      <FoodItem color="orange" icon={<Pizza />} position="topLeft" rotation="right" />

      <FoodItem color="yellow" icon={<Soup />} position="topRight" rotation="left" />
      <FoodItem color="blue" icon={<Donut />} position="bottomLeft" rotation="left" />
      <FoodItem color="green" icon={<Salad />} position="bottomRight" rotation="right" />
    </>
  );
};
