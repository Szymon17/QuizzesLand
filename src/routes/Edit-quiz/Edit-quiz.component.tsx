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
import { setAlert } from "../../store/alert/alert-reducer";
import EditableQuiz from "../../components/Editable-quiz/Editable-quiz.component";

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

  const sendQuizToDb = () => {
    if (editDelayTime > actualTime) {
      dispatch(setAlert("musisz odczekać chwilę po edycji następnego quizu"));
      return;
    }

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
    <div className="edit-quiz">
      <EditableQuiz handler={sendQuizToDb} quiz={quiz} />
    </div>
  );
};

export default EditQuiz;
