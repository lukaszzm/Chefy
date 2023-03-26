import { Category } from "../Explore/Category";
import { BiInfoCircle } from "react-icons/bi";
import { Modal } from "../Modal/Modal";
import { useModal } from "@/hooks/useModal";
import { RecipeDetails } from "./RecipeDetails";

interface ILikedRecipe {
  id: string;
  title: string;
  area: string;
  category: string;
  ingredients: string[];
  instructions: string;
}

export const LikedRecipe: React.FC<ILikedRecipe> = ({
  id,
  title,
  area,
  category,
  ingredients,
  instructions,
}) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="flex justify-between items-center bg-gray-100 p-2 px-4 mb-4 rounded-md shadow-sm border border-gray-200">
        <div>
          <p className="text-left p-1 font-medium text-md">{title}</p>
          <Category hideLabel={true} category={category} area={area} />
        </div>
        <button
          onClick={openModal}
          className="rounded-full border-none bg-none shadow-none hover:shadow-none focus:shadow-none active:shadow-none active:text-gray-600 focus:text-gray-600  text-gray-400 hover:text-gray-600 hover:scale-110 transition duration-150  ease-in-out"
        >
          <BiInfoCircle size="34px" height="1x" />
        </button>
      </div>
      <Modal isModalOpen={isModalOpen} closeModal={closeModal} title={title}>
        <RecipeDetails
          id={id}
          title={title}
          ingredients={ingredients}
          instructions={instructions}
        />
      </Modal>
    </>
  );
};
