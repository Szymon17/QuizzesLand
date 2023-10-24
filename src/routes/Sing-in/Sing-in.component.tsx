import "./Sing-in.styles.css";
import { ChangeEvent, useState, useEffect, KeyboardEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { logInEmail } from "../../store/user/user-actions";
import { selectUser } from "../../store/user/user-selector";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FormInput from "../../components/Form-input/Form-input.component";
import Button from "../../components/Button/Button.component";

const SingIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user) setTimeout(() => navigate("/"), 500);
  }, [user, navigate]);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const logInUser = () => dispatch(logInEmail({ email, password, dispatch: dispatch }));

  const logInUserAfterKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") logInUser();
  };

  return (
    <div className="singIn">
      <FontAwesomeIcon className="singIn__userIcon" icon={faUser} />
      <h2>Zaloguj się</h2>
      <FormInput onChange={onChangeEmail} description="Email" value={email} />
      <FormInput type="password" onKeyUp={logInUserAfterKeyPress} onChange={onChangePassword} description="Hasło" value={password} />
      <footer className="footer__container">
        <Button onClick={logInUser}>Zaloguj się</Button>
        <Button onClick={() => navigate("/sing-up")}>Zarejstruj się</Button>
      </footer>
    </div>
  );
};

export default SingIn;
