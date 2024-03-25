import { Donut, Pizza, Salad, Soup } from "lucide-react";
import { FoodItem } from "./food-item";

export const FoodOverlay = () => {
  return (
    <>
      <FoodItem
        icon={<Pizza />}
        position="topLeft"
        rotation="right"
        color="orange"
      />

      <FoodItem
        icon={<Soup />}
        position="topRight"
        rotation="left"
        color="yellow"
      />
      <FoodItem
        icon={<Donut />}
        position="bottomLeft"
        rotation="left"
        color="blue"
      />
      <FoodItem
        icon={<Salad />}
        position="bottomRight"
        rotation="right"
        color="green"
      />
    </>
  );
};
