import "./CustomAlert.styles.css";
import { motion } from "framer-motion";
import { selectAlertText } from "../../store/alert/alert-selectors";
import { useAppSelector } from "../../store/hooks";

const CustomAlert = () => {
  const text = useAppSelector(selectAlertText);

  return (
    <motion.div
      className="alert"
      initial={{ maxHeight: 0, width: "200px", translateY: "-100%" }}
      animate={{
        width: [0, 200],
        y: [0, 50],
        maxHeight: "200px",

        transition: {
          y: {
            duration: 0.3,
          },
          width: {
            delay: 0.4,
            duration: 0.25,
          },
          maxHeight: {
            delay: 0.4 + 0.25,
            duration: 0.25,
          },
        },
      }}
      exit={{ left: "100%" }}
    >
      <div className="alert-text">{text}</div>
    </motion.div>
  );
};

export default CustomAlert;
