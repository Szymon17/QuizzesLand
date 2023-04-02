import "./Quiz-result.styles.css";
import { FC, useState } from "react";
import { quizPropsTypes } from "../Quiz/Quiz.component";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { selectUserAnswers } from "../../store/answers/answers-selectors";
import { selectUser } from "../../store/user/user-selector";
import AnswerToDisplay, { ANSWERS_CLASSES } from "../Answer-to-display/Answer-to-display.component";
import { updateQuizLikes } from "../../store/quizzes/quizzes-reducer";
import { updateSolvedQuizzesUid } from "../../store/user/user-reducer";

const QuizResult: FC<quizPropsTypes> = ({ quiz }) => {
  const dispatch = useAppDispatch();
  const [likes, setLikes] = useState(quiz.likes);
  const userAnswers = useAppSelector(selectUserAnswers);
  const user = useAppSelector(selectUser);
  const userSolvedQuizzes = user?.solvedQuizzes;

  const correctAnswersCount = userAnswers.reduce((acc, answer) => {
    if (answer.correct) acc++;
    return acc;
  }, 0);

  const Like = () => {
    if (user) {
      setLikes(likes + 1);
      dispatch(updateQuizLikes(quiz));
      dispatch(updateSolvedQuizzesUid({ quiz, user }));
    }
  };

  return (
    <div className="quiz-result">
      {Object.values(quiz.questions).map((question, index) => {
        const questionMap = question.answers;

        return (
          <div key={index} className="question">
            <span className="question-index">{question.question}</span>

            {questionMap.map((answerSnap, i) => {
              const answer = answerSnap;
              const userAnswer = userAnswers[index];

              if (answer) {
                if (answer.id === userAnswer.id) {
                  if (answer.correct) return <AnswerToDisplay key={i} type={ANSWERS_CLASSES.correct} text={answer.text} />;
                  else return <AnswerToDisplay key={i} type={ANSWERS_CLASSES.incorect} text={answer.text} />;
                } else return <AnswerToDisplay key={i} text={answer.text} />;
              } else return <span>something went wrong</span>;
            })}
          </div>
        );
      })}
      <footer className="quiz-result-footer">
        <div className="quiz-likes">
          <span className="quiz-likes-count">{likes}</span>
          {likes === quiz.likes && userSolvedQuizzes && userSolvedQuizzes.filter(uid => uid === quiz.uid).length === 0 ? (
            <FontAwesomeIcon className="unresolved" onClick={Like} icon={faHeart} />
          ) : (
            <FontAwesomeIcon className="solved" icon={faHeart} />
          )}
        </div>
        <span className="quiz-result__correct-answers">{`${correctAnswersCount}/${userAnswers.length}`}</span>
      </footer>
    </div>
  );
};

export default QuizResult;
