import "./Quiz.styles.css";
import { FC, useState } from "react";
import { quizzType } from "../store/quizzes/quizz-types";
import { useAppSelector } from "../store/hooks";
import { selectProgress } from "../store/answers/answers-selectors";
import { motion } from "framer-motion";
import QuizAnswers from "../components/Quiz-answers/Quiz-answers.component";

type quizPropsTypes = {
  quiz: quizzType;
};

const Quiz: FC<quizPropsTypes> = ({ quiz }) => {
  const [startAnim, setAnimState] = useState(false);
  const [renderFakeButtons, setFakeButtonsState] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(quiz.answers[0]);
  const progress = useAppSelector(selectProgress);

  const fullAnimationTime = 1500;

  const onClickHandler = () => {
    setFakeButtonsState(true);

    setTimeout(() => {
      setFakeButtonsState(false);
      setAnimState(true);

      setTimeout(() => {
        setQuizAnswer(quiz.answers[progress + 1]);
        setAnimState(false);
      }, 10);
    }, fullAnimationTime - 10);
  };

  console.log(quizAnswer);
  return (
    <div className="Quiz">
      {!startAnim && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="Quiz-container">
          {quizAnswer ? (
            <QuizAnswers quizAnswer={quizAnswer} fakeAnswersState={renderFakeButtons} clickHandler={onClickHandler} />
          ) : (
            <span>Result</span>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;
