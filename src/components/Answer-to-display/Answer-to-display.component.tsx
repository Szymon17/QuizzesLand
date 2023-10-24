import "./Answer-to-display.styles.css";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

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
    <div className={`answer ${type}`}>
      <div className="answer__button">
        <span className="answer__text">{text}</span>
        {type === ANSWERS_CLASSES.incorect && <FontAwesomeIcon className="answer__icon incorrect" icon={faXmark} />}
        {type === ANSWERS_CLASSES.correct && <FontAwesomeIcon className="answer__icon correct" icon={faCheck} />}
      </div>
    </div>
  );
};

export default AnswerToDisplay;
