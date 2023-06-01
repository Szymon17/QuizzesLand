import "./CustomLink.styles.css";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

type LinkProps = { cssClass?: string; to: string; children: any };

const animations = {
  underline: {
    on: {
      width: "100%",
      transition: { type: "linear" },
    },
    off: {
      width: 0,
      transition: { type: "linear" },
    },
  },

  bounce: {
    scale: 1.2,
    transition: {
      damping: 100,
      bouncing: 10,
      stiffness: 50,
    },
  },
};

const CustomLink: FC<LinkProps> = ({ cssClass, to, children }) => {
  const [animationOn, setAnimationState] = useState(false);

  if (typeof children === "object")
    return (
      <motion.div whileHover={animations.bounce} className={`${cssClass ? "custom__link " + cssClass : "custom__link"}`}>
        <Link to={to}>{children}</Link>
      </motion.div>
    );
  else
    return (
      <div
        onMouseEnter={() => setAnimationState(true)}
        onMouseOut={() => setAnimationState(false)}
        className={`${cssClass ? "custom__link " + cssClass : "custom__link"}`}
      >
        <Link to={to}>{children}</Link>
        <motion.div className="custom__link__underline" animate={animationOn ? animations.underline.on : animations.underline.off} />
      </div>
    );
};

export default CustomLink;
