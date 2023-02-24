import { Category } from "../Recipe/Category";
import { BiInfoCircle } from "react-icons/bi";
import { Modal } from "../UI/Modal";
import { useModal } from "../../hooks/useModal";
import { RecipeDetails } from "./RecipeDetails";
import { Button } from "../UI/Button";

interface ILikedRecipe {
  id: string;
  title: string;
  area: string;
  category: string;
  ingredients: string[];
  instructions: string;
}

export const LikedRecipe: React.FC<ILikedRecipe> = (props) => {
  const { id, title, area, category, ingredients, instructions } = props;
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="flex justify-between items-center bg-gray-50 p-1 px-4 mb-2">
        <div>
          <p className="text-left p-1 font-semibold text-md">{title}</p>
          <Category noTitle category={category} area={area} />
        </div>
        <Button
          type="none"
          onClick={openModal}
          className="rounded-full w-auto border-none bg-none shadow-none hover:shadow-none focus:shadow-none active:shadow-none active:text-gray-600 focus:text-gray-600  text-gray-400 hover:text-gray-600 hover:scale-110 transition duration-150  ease-in-out"
        >
          <BiInfoCircle size="34px" height="1x" />
        </Button>
      </div>
      <Modal isModalOpen={isModalOpen} closeModal={closeModal} title={title}>
        <RecipeDetails
          id={id}
          ingredients={ingredients}
          instructions={instructions}
        />
      </Modal>
    </>
  );
};
