import "./Edit-quiz.styles.css";
import { useState, useEffect, MouseEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectQuizById, selectUserEditDelayTime } from "../../store/quizzes/quizzes-selectors";
import { getQuiz, updateQuiz, updateUserSnapshotQuiz } from "../../utils/firebase/firebase";
import { addQuizToReducer, updateQuizParamsInReducer } from "../../store/quizzes/quizzes-reducer";
import { validateQuizParamsToUpdate } from "../../utils/functions/basic-functions";
import { quizzType, updateQuizParams } from "../../store/quizzes/quizz-types";
import { selectQuiz } from "../../store/create-quiz/create-quiz-selector";
import { updateUserQuiz } from "../../store/user/user-reducer";
import { selectUser } from "../../store/user/user-selector";
import EditableQuiz from "../../components/Editable-quiz/Editable-quiz.component";
import Button, { BUTTON_CLASSES } from "../../components/Button/Button.component";
import { setAlert } from "../../store/alert/alert-reducer";

const EditQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const quizUid = useParams()["*"];

  const quizFromReducer = useAppSelector(selectQuizById(quizUid ? quizUid : ""));
  const quizToSend = useAppSelector(selectQuiz) as quizzType;
  const editDelayTime = useAppSelector(selectUserEditDelayTime);
  const user = useAppSelector(selectUser);

  const [buttonActive, setButtonState] = useState(true);
  const [quiz, setQuiz] = useState(quizFromReducer);

  const actualTime = new Date().getTime();

  useEffect(() => {
    if ((!quiz && !user) || quiz?.authorUID !== user?.id) {
      navigate("/");
      return;
    }

    const fetchQuiz = async () => {
      if (quizUid) {
        const featchedQuiz = await getQuiz(quizUid);
        if (featchedQuiz) {
          dispatch(addQuizToReducer(featchedQuiz));
          setQuiz(featchedQuiz);
        }
      }
    };

    if (editDelayTime > actualTime) navigate("/");

    if (quiz) setQuiz(quiz);
    else if (quizUid) fetchQuiz();
  }, []);

  const sendQuizToDb = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (quizToSend && quiz) {
      const paramsToUpdate: updateQuizParams = {
        questions: quizToSend.questions,
        title: quizToSend.title,
        description: quizToSend.description,
      };

      const validateState = validateQuizParamsToUpdate(paramsToUpdate);

      if (validateState === true && user) {
        setButtonState(false);
        updateQuiz(paramsToUpdate, quiz.uid, () => navigate("/"));
        updateUserSnapshotQuiz(paramsToUpdate.title, quiz.uid, user);
        dispatch(updateUserQuiz({ title: paramsToUpdate.title, uid: quiz.uid }));
        dispatch(updateQuizParamsInReducer({ params: paramsToUpdate, uid: quiz.uid }));
      } else if (typeof validateState === "string") dispatch(setAlert(validateState));
    }
  };

  return (
    <EditableQuiz quiz={quiz}>
      {buttonActive && editDelayTime < actualTime ? (
        <Button onClick={sendQuizToDb}>Aktualizuj</Button>
      ) : (
        <Button buttonType={BUTTON_CLASSES.base_disabled} onClick={() => null}>
          Aktualizuj
        </Button>
      )}
    </EditableQuiz>
  );
};

export default EditQuiz;
