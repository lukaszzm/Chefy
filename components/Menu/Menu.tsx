import { BiHeart, BiGlobe, BiLogOut, BiSlider } from "react-icons/bi";
import { MenuItem } from "./MenuItem";
import { useModal } from "../../hooks/useModal";
import { LogoutModal } from "./LogoutModal";
import { Logo } from "../UI/Logo";

export const Menu = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="fixed overflow-auto h-16 overflow-x-hidden inset-x-0 bottom-0 w-full bg-gray-50 border-t flex z-10 sm:h-full sm:px-2 sm:w-32 md:w-64 sm:flex-col sm:inset-auto sm:bottom-auto justify-between sm:justify-start items-center shadow-xl">
        <Logo className="p-4 ml-2" hideInMobile />
        <div className="flex basis-3/4 sm:basis-auto justify-between  sm:w-auto sm:flex-col md:pb-10 md:mx-2 md:border-b md:border-b-gray-400">
          <MenuItem text="explore" icon={<BiGlobe size="28px" />} />
          <MenuItem text="likes" icon={<BiHeart size="28px" />} />
          <MenuItem text="settings" icon={<BiSlider size="28px" />} />
        </div>
        <div className="w-1/4 sm:w-auto md:w-56 flex flex-col md:pt-10">
          <MenuItem
            type="button"
            onClick={() => openModal()}
            text="log out"
            icon={<BiLogOut size="28px" />}
          />
        </div>
      </div>
      <LogoutModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};
