import "./Account-panel.styles.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user-selector";
import { useNavigate } from "react-router";
import { selectUserDeleteDelayTime, selectUserEditDelayTime } from "../../store/quizzes/quizzes-selectors";
import { deleteQuizFromDb } from "../../utils/firebase/firebase";
import { deleteUserQuizFromReducer } from "../../store/user/user-reducer";
import { deleteQuizFromReducer } from "../../store/quizzes/quizzes-reducer";
import Button, { BUTTON_CLASSES } from "../../components/Button/Button.component";

const AccountPanel = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const userEditDelayTime = useAppSelector(selectUserEditDelayTime);
  const userDeleteDelayTime = useAppSelector(selectUserDeleteDelayTime);
  const userQuizzes = user?.userQuizzes;

  const [actualTime, setActualTime] = useState(new Date().getTime());

  useEffect(() => {
    if (user === null) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      setActualTime(now);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const deleteQuiz = (quizUid: string) => {
    if (user) {
      deleteQuizFromDb(quizUid, user);
      dispatch(deleteUserQuizFromReducer(quizUid));
      dispatch(deleteQuizFromReducer(quizUid));
    }
  };

  const calculateTime = (time: number) => {
    const difference = time - actualTime;

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { minutes, seconds };
  };

  const displayTime = (time: number) => {
    const { minutes, seconds } = calculateTime(time);

    return `${minutes} : ${seconds > 10 ? seconds : "0" + seconds}`;
  };

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
                    <div className="account-quiz-buttons">
                      <span className="edit-user-quiz">
                        {userEditDelayTime < actualTime ? (
                          <Button onClick={() => navigate(`./edit-quiz/${quiz.uid}`)}>Edytuj</Button>
                        ) : (
                          <Button onClick={() => null} buttonType={BUTTON_CLASSES.base_disabled}>
                            {displayTime(userEditDelayTime)}
                          </Button>
                        )}
                      </span>
                      <span className="delete-user-quiz">
                        {userDeleteDelayTime < actualTime ? (
                          <Button onClick={() => deleteQuiz(quiz.uid)}>Usuń</Button>
                        ) : (
                          <Button onClick={() => null} buttonType={BUTTON_CLASSES.base_disabled}>
                            {displayTime(userDeleteDelayTime)}
                          </Button>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              <div className="create-quiz-button">
                {userQuizzes && userQuizzes.length < 3 ? (
                  <Button onClick={() => navigate("./create-quiz")}>Dodaj nowy quiz</Button>
                ) : (
                  <>
                    <Button buttonType={BUTTON_CLASSES.base_disabled}>Nie możesz dodać więcej quizów</Button>
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountPanel;
