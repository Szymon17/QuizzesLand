import { FC } from "react";
import { answerType } from "../../store/quizzes/quizz-types";
import UserAnswer from "../User-answer/User-answer.component";

type QuizAnswersTypes = {
  quizAnswers: answerType[];
  fakeAnswersState: boolean;
  clickHandler: Function;
};

const QuizAnswers: FC<QuizAnswersTypes> = ({ quizAnswers, fakeAnswersState, clickHandler }) => {
  return (
    <>
      {Object.values(quizAnswers).map((answer, index) => {
        if (answer && !fakeAnswersState) return <UserAnswer key={index} changeAnsweredState={clickHandler} answer={answer} />;
        else if (answer && fakeAnswersState) return <UserAnswer key={index} fake={true} answer={answer} />;
        return <span>something went wrong</span>;
      })}
    </>
  );
};

export default QuizAnswers;
