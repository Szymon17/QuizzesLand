import "./Quiz-result.styles.css";
import { FC, useState } from "react";
import { quizPropsTypes } from "../Quiz/Quiz.component";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faNoteSticky, faClipboardQuestion, faPencil } from "@fortawesome/free-solid-svg-icons";
import { selectUserAnswers } from "../../store/answers/answers-selectors";
import { selectUser } from "../../store/user/user-selector";
import AnswerToDisplay, { ANSWERS_CLASSES } from "../Answer-to-display/Answer-to-display.component";
import { updateQuizLikes } from "../../store/quizzes/quizzes-reducer";
import { updateSolvedQuizzesUid } from "../../store/user/user-reducer";
import { motion } from "framer-motion";

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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="quiz-result">
      <div className="quiz-result__container">
        <header className="quiz-result__header">
          <p className="quiz-result__header-title">{quiz.title}</p>
          <p className="quiz-result__header-description">
            <FontAwesomeIcon className="description__icon" icon={faNoteSticky} />
            {quiz.description}
          </p>
        </header>
        <main className="quiz-result__questions-box">
          {Object.values(quiz.questions).map((questionOb, index) => {
            const questionMap = questionOb.answers;

            return (
              <div key={index} className="quiz-result__question-box">
                <p className="quiz-result__question-title">
                  <FontAwesomeIcon className="quiz-result__icon" icon={faClipboardQuestion} />
                  {questionOb.question}
                </p>
                <ul className="quiz-result__questions-answers">
                  {questionMap.map((answer, i) => {
                    const userAnswer = userAnswers[index];
                    console.log(answer.id === userAnswer.id && userAnswer);
                    return (
                      <li key={i} className="quiz-result__answer">
                        <FontAwesomeIcon className="quiz-result__icon" icon={faPencil} />
                        {answer.id === userAnswer.id ? (
                          <AnswerToDisplay key={i} type={answer.correct ? ANSWERS_CLASSES.correct : ANSWERS_CLASSES.incorect} text={answer.text} />
                        ) : (
                          <AnswerToDisplay key={i} text={answer.text} />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </main>
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
    </motion.div>
  );
};

export default QuizResult;
