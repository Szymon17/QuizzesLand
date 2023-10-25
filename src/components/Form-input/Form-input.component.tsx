import { InputHTMLAttributes, FC } from "react";
import "./Form-input.styles.css";

type FormInputPropsTypes = { description?: string; incorrect?: boolean } & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputPropsTypes> = ({ description, incorrect, ...otherProps }) => {
  return (
    <div className="formInput">
      <input className="formInput__field" {...otherProps} />
      {description && (
        <label className={`formInput__field__label ${typeof otherProps.value === "string" && otherProps.value.length > 0 ? "shrink" : ""}`}>
          {description}
        </label>
      )}
      {incorrect && <span className="formInput__incorrectLine" />}
    </div>
  );
};

export default FormInput;
