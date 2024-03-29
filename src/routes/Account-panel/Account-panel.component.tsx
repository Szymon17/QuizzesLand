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
        <div className="accountPanel">
          <div className="accountPanel__container">
            <section className="accountPanel__details">
              <h2 className="section-title">Moje dane</h2>
              <div className="accountPanel__detail">
                <span className="accountPanel__description">Nazwa użytkownika: </span>
                <span className="accountPanel__detail__body">{user.displayName}</span>
              </div>
              <div className="accountPanel__detail">
                <span className="accountPanel__description">Email: </span>
                <span className="accountPanel__detail__body">{user.email}</span>
              </div>
            </section>
            <section className="accountPanel__quizzes">
              <h2 className="section-title">Moje quizy</h2>
              {userQuizzes &&
                userQuizzes.map((quiz, index) => (
                  <div key={index} className="user-quiz">
                    <span className="accountPanel__description">Quiz {index + 1}: </span>
                    <span className="accountPanel__detail__body">{quiz.title}</span>
                    <div className="accountPanel__quizzes__buttons">
                      <span className="accountPanel__editUserQuiz">
                        {userEditDelayTime < actualTime ? (
                          <Button onClick={() => navigate(`./edit-quiz/${quiz.uid}`)}>Edytuj</Button>
                        ) : (
                          <Button onClick={() => null} buttonType={BUTTON_CLASSES.base_disabled}>
                            {displayTime(userEditDelayTime)}
                          </Button>
                        )}
                      </span>
                      <span className="accountPanel__deleteUserQuiz">
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
              <div className="accountPanel__createQuizz">
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
