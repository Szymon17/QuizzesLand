import "./Button.styles.css";
import { FC, ButtonHTMLAttributes } from "react";

export enum BUTTON_CLASSES {
  base = "base",
  white = "white",
  neon_orange = "neon-orange",
  neon_blue = "neon-blue",
  neon_green = "neon-green",
  neon_red = "neon-red",
  base_disabled = "base disabled",
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
