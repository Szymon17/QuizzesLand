import "./Quizzes.styles.css";
import { UIEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectQuizzes, selectStatus } from "../../store/quizzes/quizzes-selectors";
import { addFetchQuizzes } from "../../store/quizzes/quizzes-actions";
import QuizCard from "../../components/Quiz-card/Quiz-card.component";

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
          <div className="quizzes__quiz-box">
            <QuizCard quiz={quiz} animationType="scale" key={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
