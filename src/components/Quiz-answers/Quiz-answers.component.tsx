import { FC } from "react";
import { answerType } from "../../store/quizzes/quizz-types";
import Answer from "../Answer/Answer.component";
import FakeAnswer from "../Fake-answer/Fake-answer.component";

type QuizAnswersTypes = {
  quizAnswer: answerType;
  fakeAnswersState: boolean;
  clickHandler: Function;
};

const QuizAnswers: FC<QuizAnswersTypes> = ({ quizAnswer, fakeAnswersState, clickHandler }) => {
  return (
    <>
      {Object.values(quizAnswer).map((answer, index) => {
        if (answer && !fakeAnswersState) return <Answer key={index} changeAnsweredState={clickHandler} answer={answer} />;
        else if (answer && fakeAnswersState) return <FakeAnswer key={index} answer={answer} />;
        return <span>something went wrong</span>;
      })}
    </>
  );
};

export default QuizAnswers;
