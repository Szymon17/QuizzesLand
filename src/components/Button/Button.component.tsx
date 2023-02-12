import "./Button.styles.css";
import { FC, ButtonHTMLAttributes } from "react";

export enum BUTTON_CLASSES {
  base = "base",
  neon_blue = "neon-blue",
}

type buttonPropsTypes = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType?: BUTTON_CLASSES;
};

const Button: FC<buttonPropsTypes> = ({ buttonType = BUTTON_CLASSES.base, children, ...otherProps }) => {
  return (
    <button className={`button ${buttonType}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
