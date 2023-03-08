import "./Account-panel.styles.css";
import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user-selector";
import Button, { BUTTON_CLASSES } from "../../components/Button/Button.component";
import { useNavigate } from "react-router";

const AccountPanel = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const userQuizzes = user?.userQuizzes;

  useEffect(() => {
    if (!user) navigate("/");
  }, []);

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
              {userQuizzes &&
                userQuizzes.map((quiz, index) => (
                  <div key={index} className="user-quiz">
                    <span className="account-description">Quiz {index + 1}: </span>
                    <span className="detail-body">{quiz.title}</span>
                    <span className="delete-user-quiz"></span>
                    <span className="edit-user-quiz"></span>
                  </div>
                ))}
              {userQuizzes && userQuizzes.length < 3 ? (
                <Button onClick={() => navigate("./create-quiz")}>Dodaj nowy quiz</Button>
              ) : (
                <>
                  <Button buttonType={BUTTON_CLASSES.base_disabled}>Nie możesz dodać więcej quizów</Button>
                </>
              )}
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountPanel;
