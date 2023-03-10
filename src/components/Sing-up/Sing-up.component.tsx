import "./Sing-up.styles.css";
import { useState, ChangeEvent } from "react";
import FormInput from "../Form-input/Form-input.component";
import Button, { BUTTON_CLASSES } from "../Button/Button.component";
import { registerUser } from "../../store/user/user-actions";
import { useNavigate } from "react-router";

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
    await registerUser(email, password, displayName); //mesage tu kiedyś wstawić
    navigate("/sing-in");
  };

  return (
    <div className="sing-up">
      <h2>Zarejstruj się</h2>
      <FormInput onChange={onChangeEmail} description="Email" value={email} />
      <FormInput onChange={onChangeName} description="Nazwa" value={displayName} />
      <FormInput onChange={onChangePassword} description="Hasło" value={password} />
      <FormInput onChange={onChangeConfirmedPassword} description="Powtórz hasło" value={confirmedPassword} />
      <Button onClick={registerUserHandler} buttonType={BUTTON_CLASSES.neon_blue}>
        Zarejstruj się
      </Button>
    </div>
  );
};

export default SingUp;
