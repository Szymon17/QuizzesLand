import "./Sing-in.styles.css";
import { ChangeEvent, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import { logInEmail } from "../../store/user/user-actions";
import { selectUser } from "../../store/user/user-selector";
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

  const logInUser = () => dispatch(logInEmail({ email, password }));

  return (
    <div className="sing-in">
      <h2>Zaloguj się</h2>
      <FormInput onChange={onChangeEmail} description="Login" value={email} />
      <FormInput onChange={onChangePassword} description="Hasło" value={password} />
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
