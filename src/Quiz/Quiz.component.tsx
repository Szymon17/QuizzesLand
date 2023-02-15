import "./Quiz.styles.css";
import { FC, useState } from "react";
import { quizzType } from "../store/quizzes/quizz-types";
import { useAppSelector } from "../store/hooks";
import { selectProgress } from "../store/answers/answers-selectors";
import Answer from "../components/Answer/Answer.component";
import FakeAnswer from "../components/Fake-answer/Fanke-answer.component";
import { motion } from "framer-motion";

type quizPropsTypes = {
  quiz: quizzType;
};

const Quiz: FC<quizPropsTypes> = ({ quiz }) => {
  const [startAnim, setAnimState] = useState(false);
  const [renderFakeButtons, setFakeButtonsState] = useState(false);

  const progress = useAppSelector(selectProgress);
  const quizAnswer = quiz.answers[progress];
  const animationTime = 1000;

  const onClickHandler = () => {
    setFakeButtonsState(true);

    setTimeout(() => {
      setAnimState(true);
      setFakeButtonsState(false);
    }, animationTime);

    setTimeout(() => setAnimState(false), animationTime + 10);
  };

  return (
    <div className="Quiz">
      {!startAnim && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="Quiz-container">
          {Object.values(quizAnswer).map((answer, index) => {
            if (answer && !renderFakeButtons)
              return <Answer key={index} changeAnsweredState={onClickHandler} animationTime={animationTime} answer={answer} />;
            else if (answer && renderFakeButtons) return <FakeAnswer key={index} fake={true} answer={answer} />;
            else return <span>something went wrong</span>;
          })}
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;
