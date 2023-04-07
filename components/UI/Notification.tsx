import { motion } from "framer-motion";
import { Portal } from "../Modal/Portal";

interface INotificationProps {
  children: React.ReactNode;
}

export const Notification: React.FC<INotificationProps> = ({ children }) => {
  return (
    <Portal selector="#notification">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="fixed bg-red-400 top-4 sm:top-auto sm:bottom-4 right-4 rounded-md shadow-md flex justify-center items-center px-6 py-4 text-white"
      >
        {children}
      </motion.div>
    </Portal>
  );
};
