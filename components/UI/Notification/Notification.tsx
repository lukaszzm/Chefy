import { AnimatePresence, motion } from "framer-motion";
import { Portal } from "../Portal";
import { BiX } from "react-icons/bi";

interface NotificationProps {
  children: React.ReactNode;
  closeNotification: () => void;
  isOpen: boolean;
}

export const Notification = ({
  children,
  closeNotification,
  isOpen,
}: NotificationProps) => {
  console.log("notification");
  return (
    <Portal selector="#notification">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bg-red-400 top-4 sm:top-auto sm:bottom-4 right-4 rounded-md shadow-sm flex justify-center items-center text-white"
          >
            <div className="relative p-6">
              {children}
              <button
                aria-label="close notification"
                onClick={closeNotification}
                className="absolute top-0 right-0 rounded-full"
              >
                <BiX size={22} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};
