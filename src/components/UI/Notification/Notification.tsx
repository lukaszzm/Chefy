import { AnimatePresence, motion } from "framer-motion";
import { BiX } from "react-icons/bi";

import { Portal } from "@/components/UI/Portal";

interface NotificationProps {
  children: React.ReactNode;
  closeNotification: () => void;
  isOpen: boolean;
}

export const Notification = ({ children, closeNotification, isOpen }: NotificationProps) => {
  return (
    <Portal selector="#notification">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="fixed right-4 top-4 flex items-center justify-center rounded-md bg-red-400 text-white shadow-sm sm:bottom-4 sm:top-auto"
            exit={{ opacity: 0, scale: 0 }}
            initial={{ opacity: 0, scale: 0 }}
            role="alert"
          >
            <div className="relative p-6">
              {children}
              <button
                aria-label="close notification"
                className="absolute right-0 top-0 rounded-full"
                onClick={closeNotification}
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
