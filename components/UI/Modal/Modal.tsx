import { motion, AnimatePresence } from "framer-motion";
import { Title } from "../Title";
import { Portal } from "../Portal";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  closeModal: () => void;
  isModalOpen: boolean;
}

export const Modal = ({
  children,
  title,
  closeModal,
  isModalOpen,
}: ModalProps) => {
  return (
    <Portal selector="#modal">
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              tabIndex={-1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeModal}
              className="fixed z-40 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
            />
            <motion.div
              data-testid="modal-content"
              initial={{ y: "-75%", x: "-50%", opacity: 0 }}
              animate={{ y: "-50%", x: "-50%", opacity: 1 }}
              exit={{ y: "-75%", x: "-50%", opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed z-50 top-1/2 left-1/2 w-11/12 p-6 py-8 border md:w-2/3 md:py-8 md:px-10 max-w-md shadow-lg rounded-md bg-white"
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
