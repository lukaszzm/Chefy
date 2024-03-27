import { BiInfoCircle } from "react-icons/bi";

import { Category } from "@/components/Explore/Category";
import { RecipeDetails } from "@/components/Likes/RecipeDetails";
import { Modal } from "@/components/OLD_UI/Modal";
import { useModal } from "@/hooks/useModal";

interface LikedRecipeProps {
  id: string;
  title: string;
  area: string;
  category: string;
  ingredients: string[];
  instructions: string;
}

export const LikedRecipe = ({ id, title, area, category, ingredients, instructions }: LikedRecipeProps) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="m-2 flex items-center justify-between rounded-md border border-gray-200 bg-gray-100 p-2 px-4 shadow-sm">
        <div>
          <p className="text-md p-1 text-left font-medium">{title}</p>
          <Category area={area} category={category} hideLabel={true} />
        </div>
        <button
          aria-label="info"
          className="rounded-full border-none bg-none text-gray-400 shadow-none transition duration-150 ease-in-out hover:scale-110  hover:text-gray-600 hover:shadow-none focus:text-gray-600 focus:shadow-none active:text-gray-600  active:shadow-none"
          onClick={openModal}
        >
          <BiInfoCircle height="1x" size="34px" />
        </button>
      </div>
      <Modal closeModal={closeModal} isModalOpen={isModalOpen} title={title}>
        <RecipeDetails id={id} ingredients={ingredients} instructions={instructions} title={title} />
      </Modal>
    </>
  );
};
