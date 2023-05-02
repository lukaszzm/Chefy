import classNames from "classnames";
import { motion } from "framer-motion";

interface IAlertProps {
  children: React.ReactNode;
  variant: "error" | "success" | "warning" | "info";
}

export const Alert: React.FC<IAlertProps> = ({ children, variant }) => {
  const styles = classNames(
    "w-11/12 m-auto text-white p-3 mt-2 mb-1 rounded text-sm",
    {
      "bg-red-400": variant === "error",
      "bg-green-400": variant === "success",
      "bg-yellow-400": variant === "warning",
      "bg-blue-400": variant === "info",
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className={styles}
      role="alert"
    >
      <p>{children}</p>
    </motion.div>
  );
};
