import { BiHeart, BiX } from "react-icons/bi";

interface ButtonsProps {
  likeHandler?: () => void;
  dislikeHandler?: () => void;
  disabled?: boolean;
}

export const Buttons = ({ likeHandler, dislikeHandler, disabled }: ButtonsProps) => {
  return (
    <div className="border-t-gray mt-auto flex w-full justify-around border-t">
      <button
        aria-label="dislike"
        className="m-2 flex h-20 w-20 items-center justify-center rounded-full bg-red-400 text-lg font-medium text-white shadow-sm transition duration-150 ease-in-out  hover:bg-red-500 focus:outline-none focus:ring-0 disabled:pointer-events-none disabled:opacity-40 disabled:hover:bg-red-400"
        disabled={disabled}
        onClick={dislikeHandler}
      >
        <BiX height="1x" size="42px" />
      </button>
      <button
        aria-label="like"
        className="m-2 flex h-20 w-20 items-center justify-center rounded-full bg-green-400  text-lg font-medium text-white shadow-sm transition duration-150 ease-in-out  hover:bg-green-500 focus:outline-none focus:ring-0 disabled:pointer-events-none disabled:opacity-40 disabled:hover:bg-green-400"
        disabled={disabled}
        onClick={likeHandler}
      >
        <BiHeart height="1x" size="32px" />
      </button>
    </div>
  );
};
