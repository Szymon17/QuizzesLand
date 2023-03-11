import "./Create-quiz.styles.css";
import { useState, MouseEvent } from "react";
import { questionType } from "../../store/quizzes/quizz-types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectArrayWithCreatedQuizIndexes } from "../../store/create-quiz/create-quiz-selector";
import { addEmptyQuestion, updateDescription, updateTitle } from "../../store/create-quiz/create-quiz-reducer";
import Button, { BUTTON_CLASSES } from "../../components/Button/Button.component";
import QuestionPanel from "../../components/Question-panel/Question-panel.component";
import FormInput from "../../components/Form-input/Form-input.component";
import SendCreatedQuiz from "../../components/Send-created-quiz/Send-created-quiz.component";

const emptyQuestion: questionType = {
  question: "",
  answers: [{ text: "", correct: false, id: 1 }],
};

const CreateQuiz = () => {
  const dispatch = useAppDispatch();
  const [openedQestions, setOpenedQuestions] = useState([true]);
  const [animEnd, setAnimState] = useState(true);
  const indexesArray = useAppSelector(selectArrayWithCreatedQuizIndexes);

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

  console.log(indexesArray);

  return (
    <>
      <form className="create-quiz">
        <div className="create-quiz-container">
          <FormInput placeholder="Tytuł" onChange={e => dispatch(updateTitle(e.target.value))} />
          <textarea placeholder="Opis" onChange={e => dispatch(updateDescription(e.target.value))} />
          <Button buttonType={BUTTON_CLASSES.neon_blue} onClick={createNewQuestion}>
            Dodaj pytanie
          </Button>
          <div className="questions-container">
            {indexesArray.map(questionIndex => (
              <QuestionPanel key={questionIndex} questionIndex={questionIndex} clickHandler={controlOpenState} open={openedQestions[questionIndex]} />
            ))}
          </div>
        </div>
        <SendCreatedQuiz />
      </form>
    </>
  );
};

export default CreateQuiz;
