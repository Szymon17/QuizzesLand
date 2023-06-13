import "./Home-page.styles.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { replaceFetchQuizzes } from "../../store/quizzes/quizzes-actions";
import { selectRandomQuizes, selectUserDelayTime } from "../../store/quizzes/quizzes-selectors";
import QuizCard from "../../components/Quiz-card/Quiz-card.component";
import { motion } from "framer-motion";

const variants = {
  hidden: (i: number) => {
    const distanceX = 300;
    const distanceY = -100;

    return {
      x: i % 2 !== 0 ? distanceX : distanceX * -1,
      y: i < 2 ? distanceY : distanceY * -1,
      opacity: 0,
    };
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
  },
};

const HomePage = () => {
  const [once, setOnce] = useState(true);
  const randomQuizzes = useAppSelector(selectRandomQuizes(4));
  const userDelayTime = useAppSelector(selectUserDelayTime);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const actialTime = new Date().getTime();

    if (once) {
      setOnce(false);
      if (userDelayTime < actialTime && randomQuizzes.length > 1) {
        dispatch(replaceFetchQuizzes(10));
      } else if (randomQuizzes.length === 0) {
        dispatch(replaceFetchQuizzes(10));
      }
    }
  }, []);

  return (
    <div className="Homepage">
      <div className="recomended-quizzes">
        <div className="recomended-quizzez-container">
          {randomQuizzes.map((quiz, index) => (
            <motion.div
              key={index}
              initial={variants.hidden(index)}
              animate={variants.show}
              transition={{ delay: 0.2 * index, duration: 0.3 }}
              className="homepage__card-box"
            >
              <QuizCard quiz={quiz} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
