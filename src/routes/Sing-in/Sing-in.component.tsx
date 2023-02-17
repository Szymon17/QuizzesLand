import { ChangeEvent, useState } from "react";
import FormInput from "../../components/Form-input/Form-input.component";
import "./Sing-in.styles.css";

const SingIn = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <div className="sing-in">
      <span>Zaloduj się</span>
      <FormInput onChange={onChangeLogin} description="Login" value={login} />
      <FormInput onChange={onChangePassword} description="Hasło" value={password} />
    </div>
  );
};

export default SingIn;
