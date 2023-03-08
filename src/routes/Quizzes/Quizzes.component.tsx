import "./Quizzes.styles.css";
import { UIEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectQuizzes, selectStatus } from "../../store/quizzes/quizzes-selectors";
import { addFetchQuizzes } from "../../store/quizzes/quizzes-actions";

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
        console.log("fetch");
        console.log(lastIndexConunt);
        dispatch(addFetchQuizzes({ numberOfDocs: fetchQuizesCount, fromIndexCount: lastIndexConunt }));

        setDelayScrollEvent(true);
        setTimeout(() => setDelayScrollEvent(false), 1000);
      } else if (lastIndexConunt > 0) {
        console.log(lastIndexConunt, "xD");
        dispatch(addFetchQuizzes({ numberOfDocs: lastIndexConunt + 1, fromIndexCount: lastIndexConunt })); //przetestować to bo coś może być nie tak z ostatbnim indexem bo fetchuje go kilka razy
      }
    }
  };

  return (
    <div className="Quizzes">
      <div onScroll={scrollFetch} className="quizzes-container">
        {quizzes.map((quiz, index) => (
          <div className="quiz-item" key={index}>
            {quiz.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
