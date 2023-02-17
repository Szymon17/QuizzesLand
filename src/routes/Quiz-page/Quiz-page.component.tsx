import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Spiner from "../../components/Spiner/Spiner.component";
import Quiz from "../../components/Quiz/Quiz.component";
import { useAppSelector } from "../../store/hooks";
import { quizzType } from "../../store/quizzes/quizz-types";
import { selectQuizzes } from "../../store/quizzes/quizzes-selectors";
import { getQuiz } from "../../utils/firebase/firebase";

const QuizPage = () => {
  const url = useParams()["*"];
  const [quiz, setQuizz] = useState<quizzType | void>(undefined);
  const quizzes = useAppSelector(selectQuizzes);

  useEffect(() => {
    const setQuizFromDB = async (url: string) => {
      const quiz = await getQuiz(url);
      setQuizz(quiz);
    };

    const searchedQuiz = quizzes.filter(quiz => quiz.uid === url)[0];

    if (searchedQuiz) setQuizz(searchedQuiz);
    else if (url) setQuizFromDB(url);
  }, []);

  return <div className="Quizz">{quiz ? <Quiz quiz={quiz} /> : <Spiner />}</div>;
};

export default QuizPage;
