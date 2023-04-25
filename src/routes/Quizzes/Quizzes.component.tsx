import "./Quizzes.styles.css";
import { UIEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectQuizzes, selectStatus } from "../../store/quizzes/quizzes-selectors";
import { addFetchQuizzes } from "../../store/quizzes/quizzes-actions";
import QuizItem from "../../components/Quiz-Item/QuizItem.component";

const Quizzes = () => {
  const dispatch = useAppDispatch();
  const [delayScrollEvent, setDelayScrollEvent] = useState(false);
  const quizzes = useAppSelector(selectQuizzes);
  const quizzesFetchStatus = useAppSelector(selectStatus);

  const scrollFetch = (e: UIEvent<HTMLDivElement>) => {
    const fetchQuizesCount = 5;
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
    <div className="Quizzes">
      <div onScroll={scrollFetch} className="quizzes-container">
        {quizzes.map((quiz, index) => (
          <QuizItem quiz={quiz} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
