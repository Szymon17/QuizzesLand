import "./Quiz-answers.styles.css";
import { FC } from "react";
import { answerType } from "../../store/quizzes/quizz-types";
import UserAnswer from "../User-answer/User-answer.component";
import { motion } from "framer-motion";

type QuizAnswersTypes = {
  quizAnswers: answerType[];
  fakeAnswersState: boolean;
  clickHandler: Function;
};

const QuizAnswers: FC<QuizAnswersTypes> = ({ quizAnswers, fakeAnswersState, clickHandler }) => {
  return (
    <div className="quiz__answers-box">
      {Object.values(quizAnswers).map((answer, index) => {
        if (answer && !fakeAnswersState)
          return (
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="quiz__answer-box"
            >
              <UserAnswer key={index} changeAnsweredState={clickHandler} answer={answer} />
            </motion.div>
          );
        else if (answer && fakeAnswersState) return <UserAnswer key={index} fake={true} answer={answer} />;
        return <span>something went wrong</span>;
      })}
    </div>
  );
};

export default QuizAnswers;
