import "./Sing-up.styles.css";
import { useState, ChangeEvent } from "react";
import { userRegisterData } from "../../store/user/user-types";
import { registerUser } from "../../store/user/user-actions";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../store/hooks";

import FormInput from "../Form-input/Form-input.component";
import Button, { BUTTON_CLASSES } from "../Button/Button.component";

const SingUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [displayName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onChangeConfirmedPassword = (e: ChangeEvent<HTMLInputElement>) => setConfirmedPassword(e.target.value);

  const registerUserHandler = async () => {
    const userData: userRegisterData = { email, password, confirmedPassword, displayName };
    const register = await registerUser(userData);
    if (register) navigate("/sing-in");
  };

  return (
    <div className="singUp">
      <h2>Zarejstruj się</h2>
      <FormInput onChange={onChangeEmail} description="Email" value={email} />
      <FormInput onChange={onChangeName} description="Nazwa" value={displayName} />
      <FormInput type="password" onChange={onChangePassword} description="Hasło" value={password} />
      <FormInput type="password" onChange={onChangeConfirmedPassword} description="Powtórz hasło" value={confirmedPassword} />
      <Button onClick={registerUserHandler} buttonType={BUTTON_CLASSES.base}>
        Zarejstruj się
      </Button>
    </div>
  );
};

export default SingUp;
