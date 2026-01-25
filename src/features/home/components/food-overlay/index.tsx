import { DonutIcon, PizzaIcon, SaladIcon, SoupIcon } from "lucide-react";

import { FoodItem } from "@/features/home/components/food-overlay/food-item";

export function FoodOverlay() {
  return (
    <>
      <FoodItem color="orange" icon={<PizzaIcon />} position="topLeft" rotation="right" />
      <FoodItem color="yellow" icon={<SoupIcon />} position="topRight" rotation="left" />
      <FoodItem color="blue" icon={<DonutIcon />} position="bottomLeft" rotation="left" />
      <FoodItem color="green" icon={<SaladIcon />} position="bottomRight" rotation="right" />
    </>
  );
}
