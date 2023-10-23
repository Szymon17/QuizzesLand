import "./Quizzes.styles.css";
import { UIEvent, useState, useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectQuizzes, selectRandomQuizes, selectStatus, selectUserDelayTime } from "../../store/quizzes/quizzes-selectors";
import { addFetchQuizzes, replaceFetchQuizzes } from "../../store/quizzes/quizzes-actions";
import QuizItem from "../../components/Quiz-Item/QuizItem.component";

const Quizzes: FC<{ category?: any }> = ({ category = "Wszystko" }) => {
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
        dispatch(replaceFetchQuizzes(12));
      } else if (randomQuizzes.length === 0) {
        dispatch(replaceFetchQuizzes(12));
      }
    }
  }, []);

  const scrollFetch = (e: UIEvent<HTMLDivElement>) => {
    console.log("triger");

    const fetchQuizesCount = 6;
    const scrollHeight = e.currentTarget.scrollHeight - e.currentTarget.offsetHeight;
    const userScroll = e.currentTarget.scrollTop;

    const lastIndexConunt = quizzes[quizzes.length - 1].index;

    if (userScroll > scrollHeight - 100 && !delayScrollEvent && quizzesFetchStatus !== "loading") {
      if (lastIndexConunt - fetchQuizesCount > 0) {
        dispatch(addFetchQuizzes({ numberOfDocs: fetchQuizesCount, fromIndexCount: lastIndexConunt }));
      } else if (lastIndexConunt > 0) {
        dispatch(addFetchQuizzes({ numberOfDocs: lastIndexConunt + 1, fromIndexCount: lastIndexConunt }));
      }

      setDelayScrollEvent(true);
      setTimeout(() => setDelayScrollEvent(false), 1000);
    }
  };

  return (
    <div className="Quizzes" onScroll={scrollFetch}>
      <h1 className="Quizzes__category">
        Kategoria: <span className="Quizzes__category-span">{category}</span>
      </h1>
      <div className="quizzes-container">
        {quizzes.map((quiz, index) => (
          <QuizItem quiz={quiz} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
