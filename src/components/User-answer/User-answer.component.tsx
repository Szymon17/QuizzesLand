import "./User-answer.styles.css";
import { FC, MouseEventHandler } from "react";
import { addUserAnswer } from "../../store/answers/answers-reducer";
import Button, { BUTTON_CLASSES } from "../Button/Button.component";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUserAnswers } from "../../store/answers/answers-selectors";
import AnswerToDisplay, { ANSWERS_CLASSES } from "../Answer-to-display/Answer-to-display.component";
import { answerType } from "../../store/quizzes/quizz-types";

type answerPropTypes = {
  answer: answerType;
  changeAnsweredState?: Function;
  fake?: undefined;
};

type fakeAnswerPropTypes = {
  answer: answerType;
  changeAnsweredState?: undefined;
  fake: boolean;
};

const UserAnswer: FC<answerPropTypes | fakeAnswerPropTypes> = ({ answer, changeAnsweredState, fake }) => {
  const dispatch = useAppDispatch();
  const userAnswers = useAppSelector(selectUserAnswers);
  const userAnswer = userAnswers[userAnswers.length - 1];
  const answerToDisplay = answer;

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (changeAnsweredState) changeAnsweredState();

    if (answer) {
      dispatch(addUserAnswer(answer));
    }
  };

  return (
    <>
      {!fake ? (
        <div className="User-answer">
          <Button buttonType={BUTTON_CLASSES.base} onClick={onClickHandler}>
            {answerToDisplay.text}
          </Button>
        </div>
      ) : userAnswer.id === answerToDisplay.id ? (
        answerToDisplay.correct ? (
          <div className="User-answer">
            <AnswerToDisplay type={ANSWERS_CLASSES.correct} text={answerToDisplay.text} />
          </div>
        ) : (
          <div className="User-answer">
            <AnswerToDisplay type={ANSWERS_CLASSES.incorect} text={answerToDisplay.text} />
          </div>
        )
      ) : (
        <div className="User-answer">
          <AnswerToDisplay text={answerToDisplay.text} />
        </div>
      )}
    </>
  );
};

export default UserAnswer;
