import { signOut } from "next-auth/react";

import { Button } from "@/components/UI/Button/Button";
import { Modal } from "@/components/UI/Modal";

interface LogoutModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export const LogoutModal = ({ isModalOpen, closeModal }: LogoutModalProps) => {
  return (
    <Modal closeModal={closeModal} isModalOpen={isModalOpen} title="Log out">
      <p className="text-center font-medium text-gray-500">Are you sure you want to log out?</p>
      <div className="mt-2 flex justify-between gap-4">
        <Button variant="outline-danger" fullWidth onClick={() => closeModal()}>
          Cancel
        </Button>
        <Button variant="danger" fullWidth onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    </Modal>
  );
};
