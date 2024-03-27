import { BiHeart, BiGlobe, BiLogOut, BiSlider } from "react-icons/bi";

import { LogoutModal } from "@/components/Navbar/LogoutModal";
import { NavbarItem } from "@/components/Navbar/NavbarItem";
import { Logo } from "@/components/UI/Logo";
import { useModal } from "@/hooks/useModal";

export const Navbar = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-10 flex h-16 w-full items-center justify-between overflow-auto overflow-x-hidden border-t bg-gray-50 shadow-xl sm:inset-auto sm:bottom-auto sm:h-full sm:w-32 sm:flex-col sm:justify-start sm:px-2 sm:pt-4 md:w-64">
        <Logo hideInMobile />
        <div className="flex basis-3/4 justify-between sm:mt-4 sm:w-auto  sm:basis-auto sm:flex-col md:mx-2 md:border-b md:border-b-gray-400 md:pb-10">
          <NavbarItem icon={<BiGlobe size="28px" />} text="explore" />
          <NavbarItem icon={<BiHeart size="28px" />} text="likes" />
          <NavbarItem icon={<BiSlider size="28px" />} text="settings" />
        </div>
        <div className="flex w-1/4 flex-col sm:w-auto md:w-56 md:pt-10">
          <NavbarItem icon={<BiLogOut size="28px" />} text="log out" type="button" onClick={() => openModal()} />
        </div>
      </div>
      <LogoutModal closeModal={closeModal} isModalOpen={isModalOpen} />
    </>
  );
};
