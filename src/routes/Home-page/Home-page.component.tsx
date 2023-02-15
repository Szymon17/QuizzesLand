import "./Home-page.styles.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchQuizes } from "../../store/quizzes/quizzes-actions";
import { selectRandomQuizes } from "../../store/quizzes/quizzes-selectors";
import QuizCard from "../../components/Quiz-card/Quiz-card.component";

const HomePage = () => {
  const randomQuizzes = useAppSelector(selectRandomQuizes(4));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (randomQuizzes.length < 1) dispatch(fetchQuizes(4));
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
