import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchQuizes } from "../../store/quizzes/quizzes-actions";
import { selectRandomQuizes } from "../../store/quizzes/quizzes-selectors";

const HomePage = () => {
  const randomQuizzes = useAppSelector(selectRandomQuizes(4));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (randomQuizzes.length < 1) dispatch(fetchQuizes(4));
    console.log(randomQuizzes);
  }, [dispatch]);

  return <div className="Homepage">Home</div>;
};

export default HomePage;
