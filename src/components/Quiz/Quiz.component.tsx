import "./Quiz.styles.css";
import { FC, useState } from "react";
import { quizzType } from "../../store/quizzes/quizz-types";
import { useAppSelector } from "../../store/hooks";
import { selectProgress } from "../../store/answers/answers-selectors";

import { motion } from "framer-motion";
import QuizAnswers from "../Quiz-answers/Quiz-answers.component";
import QuizResult from "../Quiz-result/Quiz-result.component";

export type quizPropsTypes = {
  quiz: quizzType;
};

const Quiz: FC<quizPropsTypes> = ({ quiz }) => {
  const [renderFakeButtons, setFakeButtonsState] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState(quiz.questions[0]);
  const progress = useAppSelector(selectProgress);

  const howLongVisible = 1500;

  const showCorrectOrIncorrect = () => {
    setFakeButtonsState(true);

    setTimeout(() => {
      setFakeButtonsState(false);
      setQuizQuestion(quiz.questions[progress + 1]);
    }, howLongVisible - 100);
  };

  return (
    <div className="Quiz">
      <div className="Quiz-container">
        {quizQuestion ? (
          <>
            <span className="quiz-question">{quizQuestion.question}</span>
            <QuizAnswers quizAnswers={quizQuestion.answers} fakeAnswersState={renderFakeButtons} clickHandler={showCorrectOrIncorrect} />
          </>
        ) : (
          <QuizResult quiz={quiz} />
        )}
      </div>
    </div>
  );
};

export default Quiz;
