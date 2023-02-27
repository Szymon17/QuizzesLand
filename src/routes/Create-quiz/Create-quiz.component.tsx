import "./Create-quiz.styles.css";
import { useState, MouseEvent } from "react";
import { questionType } from "../../store/quizzes/quizz-types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectQuestions } from "../../store/create-quiz/create-quiz-selector";
import { addEmptyQuestion } from "../../store/create-quiz/create-quiz-reducer";
import Button, { BUTTON_CLASSES } from "../../components/Button/Button.component";
import QuestionPanel from "../../components/Question-panel/Question-panel.component";
import FormInput from "../../components/Form-input/Form-input.component";

const emptyQuestion: questionType = {
  question: "",
  answers: [{ text: "", correct: false, id: 1 }],
};

const CreateQuiz = () => {
  const dispatch = useAppDispatch();

  const [openedQestions, setOpenedQuestions] = useState([true]);
  const [animEnd, setAnimState] = useState(true);
  const questions = useAppSelector(selectQuestions);

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
      }, 1000);
    }
  };

  const controlOpenState = (index: number) => {
    const coppyOfArray = openedQestions;
    coppyOfArray[index] = !coppyOfArray[index];

    if (coppyOfArray.filter(el => el).length > 1) coppyOfArray.forEach(el => (el = false));

    setOpenedQuestions([...coppyOfArray]);
  };

  const test = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("send query with ob to db");
  };

  return (
    <form className="create-quiz">
      <div className="create-quiz-container">
        <FormInput description="Tytuł" />
        <textarea placeholder="Opis" />
        <Button buttonType={BUTTON_CLASSES.neon_blue} onClick={createNewQuestion}>
          Dodaj pytanie
        </Button>
        <div className="questions-container">
          {questions.map((___, questionIndex) => (
            <QuestionPanel key={questionIndex} questionIndex={questionIndex} clickHandler={controlOpenState} open={openedQestions[questionIndex]} />
          ))}
        </div>
      </div>
      <Button buttonType={BUTTON_CLASSES.neon_blue} onClick={test}>
        Stwórz
      </Button>
    </form>
  );
};

export default CreateQuiz;
