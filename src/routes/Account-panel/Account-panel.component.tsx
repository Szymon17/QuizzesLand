import "./Account-panel.styles.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user-selector";
import Button, { BUTTON_CLASSES } from "../../components/Button/Button.component";
import { useNavigate } from "react-router";
import { selectUserDelayTime, selectUserDeleteDelayTime, selectUserEditDelayTime } from "../../store/quizzes/quizzes-selectors";
import { deleteQuizFromDb, deleteUserQuiz } from "../../utils/firebase/firebase";
import { deleteUserQuizFromReducer } from "../../store/user/user-reducer";
import { deleteQuizFromReducer } from "../../store/quizzes/quizzes-reducer";

const AccountPanel = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const userEditDelayTime = useAppSelector(selectUserEditDelayTime);
  const userDeleteDelayTime = useAppSelector(selectUserDeleteDelayTime);
  const userQuizzes = user?.userQuizzes;

  const [actualTime, setActualTime] = useState(new Date().getTime());
  const [editTime, setEditTime] = useState(userEditDelayTime - actualTime);
  const [deleteTime, setDeleteTime] = useState(userDeleteDelayTime - actualTime);

  useEffect(() => {
    if (user === null) navigate("/");
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

    console.log(minutes, seconds);
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
                          <Button onClick={() => console.log("set message state")} buttonType={BUTTON_CLASSES.base_disabled}>
                            Niedostępne
                          </Button>
                        )}
                      </span>
                      <span className="delete-user-quiz">
                        {userDeleteDelayTime < actualTime ? (
                          <Button onClick={() => deleteQuiz(quiz.uid)}>Usuń</Button>
                        ) : (
                          <Button onClick={() => calculateTime(userDeleteDelayTime)} buttonType={BUTTON_CLASSES.base_disabled}>
                            Niedostępne
                          </Button>
                        )}
                      </span>
                    </div>
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
