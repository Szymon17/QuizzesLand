import "./Answer-to-display.styles.css";
import { FC } from "react";

export enum ANSWERS_CLASSES {
  neutral = "answer-neutral",
  correct = "answer-correct",
  incorect = "answer-incorect",
}

type AnswersPropsTypes = {
  type?: ANSWERS_CLASSES;
  text: string;
};

const AnswerToDisplay: FC<AnswersPropsTypes> = ({ type = ANSWERS_CLASSES.neutral, text }) => {
  return (
    <div className={`answer-to-display ${type}`}>
      <span className="fake-button">{text}</span>
    </div>
  );
};

export default AnswerToDisplay;
