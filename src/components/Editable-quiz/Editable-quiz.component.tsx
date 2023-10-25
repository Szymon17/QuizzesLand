import "./Editable-quiz.styles.css";
import { useState, MouseEvent, FC, useEffect, ChangeEvent, ReactNode } from "react";
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

const EditableQuiz: FC<{ quiz?: quizzType; children: ReactNode }> = ({ quiz, children }) => {
  const dispatch = useAppDispatch();
  const indexesArray = useAppSelector(selectArrayWithCreatedQuizIndexes);

  const [title, setTitle] = useState(quiz ? quiz.title : "");
  const [description, setDescription] = useState(quiz ? quiz.description : "");
  const [animEnd, setAnimState] = useState(true);

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

    if (animEnd) {
      setAnimState(false);
      dispatch(addEmptyQuestion(emptyQuestion));

      setTimeout(() => {
        setAnimState(true);
      }, 500);
    }
  };

  return (
    <>
      <form className="editablQuiz">
        <div className="editablQuiz__container">
          <div className="editablQuiz__topPanel">
            <FormInput incorrect={title.length < 3 && title.length !== 0} placeholder="Tytuł" value={title} onChange={changeTitle} />
            <textarea placeholder="Opis" value={description} onChange={changeDescription} />
          </div>
          <div className="editablQuiz__questionsContainer">
            {indexesArray.map(questionIndex => (
              <QuestionPanel key={questionIndex} questionIndex={questionIndex} />
            ))}
          </div>
          <div className="editableQuiz__buttons">
            {children}
            <Button buttonType={BUTTON_CLASSES.neon_blue} onClick={createNewQuestion}>
              Dodaj pytanie
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditableQuiz;
