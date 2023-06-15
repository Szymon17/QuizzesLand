import "./CustomAlert.styles.css";
import { motion } from "framer-motion";
import { selectAlertText } from "../../store/alert/alert-selectors";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useRef, useState } from "react";

const alertAnimation = {
  initial: {
    maxHeight: 0,
    width: "200px",
    translateY: "-100%",
  },
  animate: (textLength: number) => {
    const lettersInLine = 20;
    const cssAlertParams = {
      padding: 10 * 2,
      border: 2 * 2,
      lineHeight: 15,
    };

    const elementHeight = cssAlertParams.lineHeight * Math.ceil(textLength / lettersInLine) + cssAlertParams.padding + cssAlertParams.border;

    return {
      width: [0, 200],
      y: [-200, elementHeight + 10],
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
    };
  },
};

const CustomAlert = () => {
  const text = useAppSelector(selectAlertText);

  return (
    <motion.div className="alert" initial={alertAnimation.initial} animate={alertAnimation.animate(text.length)}>
      <div className="alert-text">{text}</div>
    </motion.div>
  );
};

export default CustomAlert;
