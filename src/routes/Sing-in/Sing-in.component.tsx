import "./Sing-in.styles.css";
import { ChangeEvent, useState, useEffect, KeyboardEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import { logInEmail } from "../../store/user/user-actions";
import { selectUser } from "../../store/user/user-selector";
import { setAlert } from "../../store/alert/alert-reducer";
import FormInput from "../../components/Form-input/Form-input.component";
import Button, { BUTTON_CLASSES } from "../../components/Button/Button.component";

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

  const logInUser = () => dispatch(logInEmail({ email, password, handler: () => dispatch(setAlert("Logowanie udane")) }));

  const logInUserAfterKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") logInUser();
  };

  return (
    <div className="sing-in">
      <h2>Zaloguj się</h2>
      <FormInput onChange={onChangeEmail} description="Email" value={email} />
      <FormInput type="password" onKeyUp={logInUserAfterKeyPress} onChange={onChangePassword} description="Hasło" value={password} />
      <footer className="footer-container">
        <Button onClick={logInUser} buttonType={BUTTON_CLASSES.neon_blue}>
          Zaloguj się
        </Button>
        <Link className="sing-up-link" to="/sing-up">
          Zarejstruj się
        </Link>
      </footer>
    </div>
  );
};

export default SingIn;
