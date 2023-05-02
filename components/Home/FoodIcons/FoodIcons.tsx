import pizza from "@/public/pizza.svg";
import pot from "@/public/pot.svg";
import spaghetti from "@/public/spaghetti.svg";
import sushi from "@/public/sushi.svg";
import steaming from "@/public/steaming.svg";
import omlet from "@/public/omlet.svg";
import Image from "next/image";

const foodIcons = [pizza, pot, spaghetti, sushi, steaming, omlet];

export const FoodIcons = () => {
  return (
    <div className="flex w-2/3 m-auto justify-around mb-8">
      {foodIcons.map((el, index) => (
        <Image
          key={index}
          src={el}
          alt=""
          width={40}
          height={40}
          className="w-10 mx-2 sm:w-16 sm:mx-4"
        />
      ))}
    </div>
  );
};
