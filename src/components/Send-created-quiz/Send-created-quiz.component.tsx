import { MouseEvent } from "react";
import { selectQuiz } from "../../store/create-quiz/create-quiz-selector";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user-selector";
import { quizzType } from "../../store/quizzes/quizz-types";
import { v4 } from "uuid";
import { validateQuiz } from "../../utils/functions/basic-functions";
import { resetCreateQuizState } from "../../store/create-quiz/create-quiz-reducer";
import { addNewQuizToDb, getDocumentsCount } from "../../utils/firebase/firebase";
import { useNavigate } from "react-router";
import { updateUserQuizzes } from "../../store/user/user-reducer";
import Button, { BUTTON_CLASSES } from "../Button/Button.component";
import { addQuizToReducer } from "../../store/quizzes/quizzes-reducer";

const SendCreatedQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const quizSnapshot = useAppSelector(selectQuiz);
  const user = useAppSelector(selectUser);

  const sendQuizToDB = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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
        index: await getDocumentsCount("quizzes"),
      };

      const tryValidate = validateQuiz(quiz);

      if (tryValidate === true) {
        addNewQuizToDb(user, quiz, () => {
          navigate("/");
          dispatch(resetCreateQuizState());
        });
        dispatch(updateUserQuizzes(quiz));
        dispatch(addQuizToReducer(quiz));
      } else console.error(tryValidate);
    }
  };

  return (
    <Button buttonType={BUTTON_CLASSES.neon_blue} onClick={sendQuizToDB}>
      Stwórz
    </Button>
  );
};

export default SendCreatedQuiz;
