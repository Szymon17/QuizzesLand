import "./Home-page.styles.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { replaceFetchQuizzes } from "../../store/quizzes/quizzes-actions";
import { selectRandomQuizes, selectUserDelayTime } from "../../store/quizzes/quizzes-selectors";
import QuizCard from "../../components/Quiz-card/Quiz-card.component";

const HomePage = () => {
  const [once, setOnce] = useState(true);
  const randomQuizzes = useAppSelector(selectRandomQuizes(4));
  const userDelayTime = useAppSelector(selectUserDelayTime);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(process.env.NODE_ENV);
    const actialTime = new Date().getTime();

    if (once) {
      setOnce(false);
      if (userDelayTime < actialTime && randomQuizzes.length > 1) {
        dispatch(replaceFetchQuizzes(10));
        console.log("*******************", "featched");
      } else if (randomQuizzes.length === 0) {
        dispatch(replaceFetchQuizzes(10));
        console.log("*******************", "empty featched");
      }
    }
  }, []);

  return (
    <div className="Homepage">
      <aside className="last-quizzes"></aside>
      <div className="recomended-quizzes">
        <div className="recomended-quizzez-container">
          {randomQuizzes.map((quiz, index) => (
            <QuizCard key={index} quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
