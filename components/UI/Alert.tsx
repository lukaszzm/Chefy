import classNames from "classnames";
import { motion } from "framer-motion";

interface IAlertProps {
  children: React.ReactNode;
  isError?: boolean;
}

export const Alert: React.FC<IAlertProps> = ({ children, isError }) => {
  const styles = classNames(
    "w-11/12 m-auto text-white p-3 mt-2 mb-1 rounded text-sm",
    {
      "bg-red-400": isError,
      "bg-green-400": !isError,
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className={styles}
    >
      <p>{children}</p>
    </motion.div>
  );
};
