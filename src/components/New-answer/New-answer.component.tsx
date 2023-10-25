import "./New-answer.styles.css";
import { FC, ChangeEvent, MouseEvent } from "react";
import { faXmark, faTrashCan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { answerType } from "../../store/quizzes/quizz-types";
import { updateAnswer, removeAnswer } from "../../store/create-quiz/create-quiz-reducer";
import { selectAnswers } from "../../store/create-quiz/create-quiz-selector";

import Button, { BUTTON_CLASSES } from "../Button/Button.component";
import FormInput from "../Form-input/Form-input.component";

type createdAnswerTypes = {
  questionIndex: number;
  answerIndex: number;
  answer: answerType;
};

const CreatedAnswer: FC<createdAnswerTypes> = ({ questionIndex, answerIndex, answer }) => {
  const dispatch = useAppDispatch();
  const answers = useAppSelector(selectAnswers(questionIndex));

  const updateAnswerText = (e: ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => {
    const text = e.target.value;

    dispatch(updateAnswer({ questionIndex, answerIndex, params: { text } }));
  };

  const updateAnswerCorrect = (e: MouseEvent<HTMLButtonElement>, questionIndex: number, answerIndex: number) => {
    e.preventDefault();
    const correct = !answers[answerIndex].correct;

    dispatch(updateAnswer({ questionIndex, answerIndex, params: { correct } }));
  };

  const removeAnswerHandler = (e: MouseEvent<HTMLButtonElement>, questionIndex: number, answerIndex: number) => {
    e.preventDefault();
    dispatch(removeAnswer({ questionIndex, answerIndex }));
  };

  return (
    <div className="answer">
      <FormInput
        value={answer.text}
        placeholder="Dodaj odpowiedź"
        onChange={e => updateAnswerText(e, questionIndex, answerIndex)}
        incorrect={answer.text.length < 2 && answer.text.length !== 0}
      />

      <Button
        buttonType={answer.correct ? BUTTON_CLASSES.neon_green : BUTTON_CLASSES.neon_red}
        onClick={e => updateAnswerCorrect(e, questionIndex, answerIndex)}
      >
        <FontAwesomeIcon icon={answer.correct ? faCheck : faXmark} />
      </Button>

      {answerIndex !== 0 ? (
        <Button buttonType={BUTTON_CLASSES.neon_red} onClick={e => removeAnswerHandler(e, questionIndex, answerIndex)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      ) : (
        <Button onClick={e => e.preventDefault()} buttonType={BUTTON_CLASSES.base_disabled}>
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      )}
    </div>
  );
};

export default CreatedAnswer;
