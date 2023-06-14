import "./Sing-in.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useState, useEffect, KeyboardEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { logInEmail } from "../../store/user/user-actions";
import { selectUser } from "../../store/user/user-selector";
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
    <div className="sing-in">
      <div className="sing-in__container">
        <h2>Zaloguj się</h2>
        <FontAwesomeIcon className="sing-in__icon" icon={faUser} />
        <FormInput onChange={onChangeEmail} description="Email" value={email} />
        <FormInput type="password" onKeyUp={logInUserAfterKeyPress} onChange={onChangePassword} description="Hasło" value={password} />
        <footer className="footer-container">
          <Button onClick={logInUser}>Zaloguj się</Button>
          <Button onClick={() => navigate("/sing-up")}>Zarejstruj się</Button>
        </footer>
      </div>
    </div>
  );
};

export default SingIn;
