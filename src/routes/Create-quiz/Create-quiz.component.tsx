import "./Create-quiz.styles.css";
import { MouseEvent } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user-selector";
import { useNavigate } from "react-router";
import { validateQuiz } from "../../utils/functions/basic-functions";
import { resetCreateQuizState } from "../../store/create-quiz/create-quiz-reducer";
import { addNewQuizToDb, getLastQuizIndex } from "../../utils/firebase/firebase";
import { updateUserQuizzes } from "../../store/user/user-reducer";
import { addQuizToReducer } from "../../store/quizzes/quizzes-reducer";
import { setAlert } from "../../store/alert/alert-reducer";
import { v4 } from "uuid";
import { selectQuiz } from "../../store/create-quiz/create-quiz-selector";
import { quizzType } from "../../store/quizzes/quizz-types";
import EditableQuiz from "../../components/Editable-quiz/Editable-quiz.component";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const quizSnapshot = useAppSelector(selectQuiz);

  const setNewIndex = async (): Promise<number> => {
    const newIndex = await getLastQuizIndex();
    if (typeof newIndex === "number") return newIndex + 1;
    else return -1;
  };

  const sendQuizToDB = async () => {
    if (user && user.userQuizzes.length < 3) {
      const regex = /\w+/g;
      const quizUid = v4().match(regex)?.join("");

      const quiz: quizzType = {
        title: quizSnapshot.title,
        author: user.displayName,
        authorUID: user.id,
        description: quizSnapshot.description,
        uid: quizUid ? quizUid : "",
        questions: quizSnapshot.questions,
        likes: 0,
        index: await setNewIndex(),
      };

      const tryValidate = validateQuiz(quiz);

      if (tryValidate === true) {
        addNewQuizToDb(user, quiz, () => {
          navigate("/");
          dispatch(resetCreateQuizState());
        });
        dispatch(updateUserQuizzes(quiz));
        dispatch(addQuizToReducer(quiz));
      } else if (typeof tryValidate === "string") dispatch(setAlert(tryValidate));
    }
  };

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  return (
    <div className="create-quiz">
      <EditableQuiz handler={sendQuizToDB} handlerName="Stwórz Quiz" />
    </div>
  );
};

export default CreateQuiz;
