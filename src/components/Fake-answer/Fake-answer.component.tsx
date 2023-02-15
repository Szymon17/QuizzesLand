import "./Fake-answer.styles.css";
import { FC } from "react";
import { answerValuesType } from "../../store/answers/answers-types";
import { selectUserAnswers } from "../../store/answers/answers-selectors";
import { useAppSelector } from "../../store/hooks";

type fakeAnswerPropTypes = {
  answer: answerValuesType;
};

const FakeAnswer: FC<fakeAnswerPropTypes> = ({ answer }) => {
  const userAnswers = useAppSelector(selectUserAnswers);
  const userAnswer = userAnswers[userAnswers.length - 1] as answerValuesType;

  return (
    <>
      {userAnswer.id === answer.id ? (
        answer.correct ? (
          <div className="Fake-answer Fake-answer-correct">
            <span className="fake-button">{answer.text}</span>
          </div>
        ) : (
          <div className="Fake-answer Fake-answer-incorrect">
            <span className="fake-button">{answer.text}</span>
          </div>
        )
      ) : (
        <div className="Fake-answer">
          <span className="fake-button">{answer.text}</span>
        </div>
      )}
    </>
  );
};

export default FakeAnswer;
