import Image from "next/image";

import omlet from "@/public/omlet.svg";
import pizza from "@/public/pizza.svg";
import pot from "@/public/pot.svg";
import spaghetti from "@/public/spaghetti.svg";
import steaming from "@/public/steaming.svg";
import sushi from "@/public/sushi.svg";

const foodIcons = [pizza, pot, spaghetti, sushi, steaming, omlet];

export const FoodIcons = () => {
  return (
    <div className="m-auto mb-8 flex w-2/3 justify-around">
      {foodIcons.map((el, index) => (
        <Image alt="" className="mx-2 w-10 sm:mx-4 sm:w-16" height={40} key={index} src={el} width={40} />
      ))}
    </div>
  );
};
