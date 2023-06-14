import "./Editable-quiz.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { useState, MouseEvent, FC, useEffect, ChangeEvent } from "react";
import { questionType, quizzType } from "../../store/quizzes/quizz-types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectArrayWithCreatedQuizIndexes } from "../../store/create-quiz/create-quiz-selector";
import {
  addEmptyQuestion,
  replaceQuestions,
  updateDescription,
  updateTitle,
  resetCreateQuizState,
} from "../../store/create-quiz/create-quiz-reducer";
import Button, { BUTTON_CLASSES } from "../Button/Button.component";
import QuestionPanel from "../Question-panel/Question-panel.component";
import FormInput from "../Form-input/Form-input.component";

const emptyQuestion: questionType = {
  question: "",
  answers: [{ text: "", correct: false, id: 1 }],
};

const EditableQuiz: FC<{ quiz?: quizzType; handler: Function }> = ({ quiz, handler }) => {
  const dispatch = useAppDispatch();
  const indexesArray = useAppSelector(selectArrayWithCreatedQuizIndexes);

  const [title, setTitle] = useState(quiz ? quiz.title : "");
  const [description, setDescription] = useState(quiz ? quiz.description : "");

  useEffect(() => {
    if (quiz) {
      dispatch(replaceQuestions(quiz.questions));
      dispatch(updateTitle(quiz.title));
      dispatch(updateDescription(quiz.description));
    }

    return () => {
      dispatch(resetCreateQuizState());
    };
  }, [quiz, dispatch]);

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    dispatch(updateTitle(e.target.value));
  };

  const changeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    dispatch(updateDescription(e.target.value));
  };

  const createNewQuestion = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addEmptyQuestion(emptyQuestion));
  };

  const handleEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handler();
  };

  return (
    <>
      <form className="editable-quiz">
        <div className="editable-quiz-container">
          <div className="editable-quiz__top-panel">
            <Button buttonType={BUTTON_CLASSES.neon_blue} onClick={createNewQuestion}>
              Dodaj pytanie
            </Button>
            <FormInput incorrect={title.length < 3 && title.length !== 0} placeholder="Tytuł" value={title} onChange={changeTitle} />
            <div className="editable-quiz__description-box">
              <FontAwesomeIcon className="description-icon icon" icon={faNoteSticky} />
              <textarea placeholder="Opis" value={description} onChange={changeDescription} />
            </div>
          </div>
          <div className="questions-container">
            {indexesArray.map(questionIndex => (
              <QuestionPanel key={questionIndex} questionIndex={questionIndex} />
            ))}
          </div>
          <Button onClick={handleEvent} buttonType={BUTTON_CLASSES.neon_orange}>
            Aktualizuj
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditableQuiz;
