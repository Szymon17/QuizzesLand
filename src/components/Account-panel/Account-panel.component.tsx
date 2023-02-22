import "./Account-panel.styles.css";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user-selector";
import Button, { BUTTON_CLASSES } from "../Button/Button.component";
import { useNavigate } from "react-router";

const AccountPanel = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const userQuizzes = user?.userQuizzes;

  return (
    <>
      {user && (
        <div className="account-panel">
          <div className="account-container">
            <section className="account-details">
              <h2 className="section-title">Moje dane</h2>
              <div className="account-detail">
                <span className="account-description">Nazwa użytkownika: </span>
                <span className="detail-body">{user.displayName}</span>
              </div>
              <div className="account-detail">
                <span className="account-description">Email: </span>
                <span className="detail-body">{user.email}</span>
              </div>
            </section>
            <section className="account-quizzes">
              <h2 className="section-title">Moje quizy</h2>
              {userQuizzes && userQuizzes.length < 3 ? (
                <Button onClick={() => navigate("./create-quiz")}>Dodaj nowy quiz</Button>
              ) : (
                <Button buttonType={BUTTON_CLASSES.base_disabled}>Dodaj nowy quiz</Button>
              )}
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountPanel;
