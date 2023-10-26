import "./Quizzes.styles.css";
import { UIEvent, useState, useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectQuizzes, selectRandomQuizes, selectStatus, selectUserDelayTime } from "../../store/quizzes/quizzes-selectors";
import { addFetchQuizzes, replaceFetchQuizzes } from "../../store/quizzes/quizzes-actions";

import QuizItem from "../../components/Quiz-Item/QuizItem.component";

const quizzesOnPage = 9;

const Quizzes = () => {
  const [once, setOnce] = useState(true);
  const [delayScrollEvent, setDelayScrollEvent] = useState(false);

  const dispatch = useAppDispatch();

  const userDelayTime = useAppSelector(selectUserDelayTime);
  const quizzes = useAppSelector(selectQuizzes);
  const quizzesFetchStatus = useAppSelector(selectStatus);
  const randomQuizzes = useAppSelector(selectRandomQuizes(4));

  useEffect(() => {
    const actialTime = new Date().getTime();

    if (once) {
      setOnce(false);
      if (userDelayTime < actialTime && randomQuizzes.length > 1) {
        dispatch(replaceFetchQuizzes(quizzesOnPage));
      } else if (randomQuizzes.length === 0) {
        dispatch(replaceFetchQuizzes(quizzesOnPage));
      }
    }
  }, []);

  const scrollFetch = (e: UIEvent<HTMLDivElement>) => {
    const scrollHeight = e.currentTarget.scrollHeight - e.currentTarget.offsetHeight;
    const userScroll = e.currentTarget.scrollTop;

    const lastIndexConunt = quizzes[quizzes.length - 1].index;

    if (userScroll > scrollHeight - 100 && !delayScrollEvent && quizzesFetchStatus !== "loading") {
      if (lastIndexConunt - quizzesOnPage > 0) {
        dispatch(addFetchQuizzes({ numberOfDocs: quizzesOnPage, fromIndexCount: lastIndexConunt }));
      } else if (lastIndexConunt > 0) {
        dispatch(addFetchQuizzes({ numberOfDocs: lastIndexConunt + 1, fromIndexCount: lastIndexConunt }));
      }

      setDelayScrollEvent(true);
      setTimeout(() => setDelayScrollEvent(false), 1000);
    }
  };

  return (
    <div className="Quizzes" onScroll={scrollFetch}>
      <h1 className="Quizzes__header">Polecane quizy</h1>
      <div className="quizzes-container">
        {quizzes.map((quiz, index) => (
          <QuizItem quiz={quiz} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
