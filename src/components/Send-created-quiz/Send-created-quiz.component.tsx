import { MouseEvent } from "react";
import { selectQuiz } from "../../store/create-quiz/create-quiz-selector";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user-selector";
import { quizzType } from "../../store/quizzes/quizz-types";
import { v4 } from "uuid";
import { validateQuiz } from "../../utils/functions/basic-functions";
import { resetCreateQuizState } from "../../store/create-quiz/create-quiz-reducer";
import { addNewQuizToDb, getLastQuizIndex } from "../../utils/firebase/firebase";
import { useNavigate } from "react-router";
import { updateUserQuizzes } from "../../store/user/user-reducer";
import { addQuizToReducer } from "../../store/quizzes/quizzes-reducer";
import { toast } from "react-toastify";

import Button from "../Button/Button.component";

const SendCreatedQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const quizSnapshot = useAppSelector(selectQuiz);
  const user = useAppSelector(selectUser);

  const setNewIndex = async (): Promise<number> => {
    const newIndex = await getLastQuizIndex();
    if (typeof newIndex === "number") return newIndex + 1;
    else return -1;
  };

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
      } else if (typeof tryValidate === "string") toast.dark(tryValidate);
    }
  };

  return <Button onClick={sendQuizToDB}>Stwórz</Button>;
};

export default SendCreatedQuiz;
