import { motion, AnimatePresence } from "framer-motion";

import { Portal } from "@/components/OLD_UI/Portal";
import { Title } from "@/components/OLD_UI/Title";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  closeModal: () => void;
  isModalOpen: boolean;
}

export const Modal = ({ children, title, closeModal, isModalOpen }: ModalProps) => {
  return (
    <Portal selector="#modal">
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              animate={{ opacity: 1 }}
              aria-labelledby="modal-title"
              aria-modal="true"
              className="fixed inset-0 z-40 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              role="dialog"
              tabIndex={-1}
              transition={{ duration: 0.2 }}
              onClick={closeModal}
            />
            <motion.div
              animate={{ y: "-50%", x: "-50%", opacity: 1 }}
              className="fixed left-1/2 top-1/2 z-50 w-11/12 max-w-md rounded-md border bg-white p-6 py-8 shadow-lg md:w-2/3 md:px-10 md:py-8"
              data-testid="modal-content"
              exit={{ y: "-75%", x: "-50%", opacity: 0 }}
              initial={{ y: "-75%", x: "-50%", opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Title id="modal-title">{title}</Title>
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
};
