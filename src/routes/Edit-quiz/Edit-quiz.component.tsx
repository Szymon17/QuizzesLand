import "./Edit-quiz.styles.css";
import { useState, useEffect, MouseEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectQuizById } from "../../store/quizzes/quizzes-selectors";
import { getQuiz, updateQuiz } from "../../utils/firebase/firebase";
import { addQuizToReducer, updateQuizParamsInReducer } from "../../store/quizzes/quizzes-reducer";
import EditableQuiz from "../../components/Editable-quiz/Editable-quiz.component";
import Button, { BUTTON_CLASSES } from "../../components/Button/Button.component";
import { validateQuizParamsToUpdate } from "../../utils/functions/basic-functions";
import { quizzType, updateQuizParams } from "../../store/quizzes/quizz-types";
import { selectQuiz } from "../../store/create-quiz/create-quiz-selector";
import { updateUserQuiz } from "../../store/user/user-reducer";

const EditQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const quizUid = useParams()["*"];
  const [buttonActive, setButtonState] = useState(true);
  const quizFromReducer = useAppSelector(selectQuizById(quizUid ? quizUid : ""));
  const quizToSend = useAppSelector(selectQuiz) as quizzType;
  const [quiz, setQuiz] = useState(quizFromReducer);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (quizUid) {
        const featchedQuiz = await getQuiz(quizUid);
        if (featchedQuiz) {
          dispatch(addQuizToReducer(featchedQuiz));
          setQuiz(featchedQuiz);
        }
      }

      console.log("featched quiz *****************");
    };

    if (quiz) setQuiz(quiz);
    else if (quizUid) fetchQuiz();
  }, []);

  console.log(quiz);

  const sendQuizToDb = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (quizToSend && quiz) {
      const paramsToUpdate: updateQuizParams = {
        questions: quizToSend.questions,
        title: quizToSend.title,
        description: quizToSend.description,
      };

      const validateState = validateQuizParamsToUpdate(paramsToUpdate);

      if (validateState === true) {
        setButtonState(false);
        updateQuiz(paramsToUpdate, quiz.uid, () => navigate("/"));
        dispatch(updateUserQuiz({ title: paramsToUpdate.title, uid: quiz.uid }));
        dispatch(updateQuizParamsInReducer({ params: paramsToUpdate, uid: quiz.uid }));
      } else console.error(validateState);
    }
  };

  return (
    <div className="edit-quiz">
      <EditableQuiz quiz={quiz} />
      {buttonActive ? (
        <Button onClick={sendQuizToDb}>Aktualizuj</Button>
      ) : (
        <Button buttonType={BUTTON_CLASSES.base_disabled} onClick={() => null}>
          Aktualizuj
        </Button>
      )}
    </div>
  );
};

export default EditQuiz;
