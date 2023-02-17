import "./Answer.styles.css";
import { FC, MouseEventHandler } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addUserAnswer } from "../../store/answers/answers-reducer";
import Button, { BUTTON_CLASSES } from "../Button/Button.component";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUserAnswers } from "../../store/answers/answers-selectors";
import { answerValuesType } from "../../store/answers/answers-types";
import AnswerToDisplay, { ANSWERS_CLASSES } from "../Answer-to-display/Answer-to-display.component";

type answerPropTypes = {
  answer: answerValuesType;
  changeAnsweredState?: Function;
  fake?: undefined;
};

type fakeAnswerPropTypes = {
  answer: answerValuesType;
  changeAnsweredState?: undefined;
  fake: boolean;
};

const Answer: FC<answerPropTypes | fakeAnswerPropTypes> = ({ answer, changeAnsweredState, fake }) => {
  const dispatch = useAppDispatch();
  const userAnswers = useAppSelector(selectUserAnswers);
  const userAnswer = userAnswers[userAnswers.length - 1] as answerValuesType;

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (changeAnsweredState) changeAnsweredState();

    if (answer) {
      dispatch(addUserAnswer(answer));
    }
  };

  return (
    <AnimatePresence initial={false} mode="wait">
      {!fake ? (
        <div className="Answer">
          <Button buttonType={BUTTON_CLASSES.base} onClick={onClickHandler}>
            {answer.text}
          </Button>
        </div>
      ) : userAnswer.id === answer.id ? (
        answer.correct ? (
          <div className="Answer">
            <AnswerToDisplay type={ANSWERS_CLASSES.correct} text={answer.text} />
          </div>
        ) : (
          <div className="Answer">
            <AnswerToDisplay type={ANSWERS_CLASSES.incorect} text={answer.text} />
          </div>
        )
      ) : (
        <div className="Answer">
          <AnswerToDisplay text={answer.text} />
        </div>
      )}
    </AnimatePresence>
  );
};

export default Answer;
