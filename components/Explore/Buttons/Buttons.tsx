import { BiHeart, BiX } from "react-icons/bi";

interface IButtonsProps {
  likeHandler?: () => void;
  dislikeHandler?: () => void;
  disabled?: boolean;
}

export const Buttons: React.FC<IButtonsProps> = ({
  likeHandler,
  dislikeHandler,
  disabled,
}) => {
  return (
    <div className="w-full flex justify-around border-t border-t-gray mt-auto">
      <button
        aria-label="dislike"
        disabled={disabled}
        onClick={dislikeHandler}
        className="flex m-2 justify-center items-center w-20 h-20 font-medium text-lg text-white bg-red-400 rounded-full shadow-sm hover:bg-red-500 disabled:opacity-40 disabled:hover:bg-red-400  disabled:pointer-events-none focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      >
        <BiX size="42px" height="1x" />
      </button>
      <button
        aria-label="like"
        disabled={disabled}
        onClick={likeHandler}
        className="flex m-2 justify-center items-center w-20 h-20 font-medium text-lg  text-white bg-green-400 rounded-full shadow-sm hover:bg-green-500 disabled:opacity-40 disabled:hover:bg-green-400  disabled:pointer-events-none focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      >
        <BiHeart size="32px" height="1x" />
      </button>
    </div>
  );
};
