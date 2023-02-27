import { InputHTMLAttributes, FC } from "react";
import "./Form-input.styles.css";

type FormInputPropsTypes = { description: string; incorrect?: boolean } & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputPropsTypes> = ({ description, incorrect, ...otherProps }) => {
  return (
    <div className="form-input-container">
      <input className={`form-input ${incorrect ? "incorrect" : "input"}`} {...otherProps} />
      {description && (
        <label className={`form-input-label ${typeof otherProps.value === "string" && otherProps.value.length > 0 ? "shrink" : ""}`}>
          {description}
        </label>
      )}
    </div>
  );
};

export default FormInput;
