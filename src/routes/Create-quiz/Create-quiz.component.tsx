import "./Create-quiz.styles.css";
import { useState, MouseEvent } from "react";
import { questionType, quizzType } from "../../store/quizzes/quizz-types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectQuiz } from "../../store/create-quiz/create-quiz-selector";
import { addEmptyQuestion, resetCreateQuizState, updateDescription, updateTitle } from "../../store/create-quiz/create-quiz-reducer";
import Button, { BUTTON_CLASSES } from "../../components/Button/Button.component";
import QuestionPanel from "../../components/Question-panel/Question-panel.component";
import FormInput from "../../components/Form-input/Form-input.component";
import { addNewQuizToDb, getDocumentsCount } from "../../utils/firebase/firebase";
import { selectUser } from "../../store/user/user-selector";
import { v4 } from "uuid";
import { updateUserQuizzes } from "../../store/user/user-reducer";
import { validateQuiz } from "../../utils/functions/basic-functions";
import { useNavigate } from "react-router";

const emptyQuestion: questionType = {
  question: "",
  answers: [{ text: "", correct: false, id: 1 }],
};

const CreateQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [openedQestions, setOpenedQuestions] = useState([true]);
  const [animEnd, setAnimState] = useState(true);
  const quizSnapshot = useAppSelector(selectQuiz);
  const user = useAppSelector(selectUser);
  const questions = quizSnapshot.questions;

  const createNewQuestion = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const closedQuestions = openedQestions.map(() => false);
    closedQuestions.push(true);

    if (animEnd) {
      setAnimState(false);
      dispatch(addEmptyQuestion(emptyQuestion));

      setTimeout(() => {
        setOpenedQuestions(closedQuestions);
        setAnimState(true);
      }, 500);
    }
  };

  const controlOpenState = (index: number) => {
    const coppyOfArray = openedQestions;
    coppyOfArray[index] = !coppyOfArray[index];

    if (coppyOfArray.filter(el => el).length > 1) coppyOfArray.forEach(el => (el = false));

    setOpenedQuestions([...coppyOfArray]);
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
        index: await getDocumentsCount("quizzes"),
      };

      const tryValidate = validateQuiz(quiz);

      if (tryValidate === true) {
        addNewQuizToDb(user, quiz, () => {
          navigate("/");
          dispatch(resetCreateQuizState());
        });
        dispatch(updateUserQuizzes(quiz));
      } else console.error(tryValidate);
    }
  };

  return (
    <form className="create-quiz">
      <div className="create-quiz-container">
        <FormInput placeholder="Tytuł" onChange={e => dispatch(updateTitle(e.target.value))} />
        <textarea placeholder="Opis" onChange={e => dispatch(updateDescription(e.target.value))} />
        <Button buttonType={BUTTON_CLASSES.neon_blue} onClick={createNewQuestion}>
          Dodaj pytanie
        </Button>
        <div className="questions-container">
          {questions.map((___, questionIndex) => (
            <QuestionPanel key={questionIndex} questionIndex={questionIndex} clickHandler={controlOpenState} open={openedQestions[questionIndex]} />
          ))}
        </div>
      </div>
      <Button buttonType={BUTTON_CLASSES.neon_blue} onClick={sendQuizToDB}>
        Stwórz
      </Button>
    </form>
  );
};

export default CreateQuiz;
