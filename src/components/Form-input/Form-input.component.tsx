import { InputHTMLAttributes, FC } from "react";
import "./Form-input.styles.css";

type FormInputPropsTypes = { description: string } & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputPropsTypes> = ({ description, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {description && (
        <label className={`form-input-label ${typeof otherProps.value === "string" && otherProps.value.length > 0 ? "shrink" : ""}`}>
          {description}
        </label>
      )}
    </div>
  );
};

export default FormInput;
