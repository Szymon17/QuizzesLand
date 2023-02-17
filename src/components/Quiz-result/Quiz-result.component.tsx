import "./Quiz-result.styles.css";
import { FC } from "react";
import { quizPropsTypes } from "../Quiz/Quiz.component";
import { useAppSelector } from "../../store/hooks";
import { answerValuesType } from "../../store/answers/answers-types";
import { selectUserAnswers } from "../../store/answers/answers-selectors";
import AnswerToDisplay, { ANSWERS_CLASSES } from "../Answer-to-display/Answer-to-display.component";

const QuizResult: FC<quizPropsTypes> = ({ quiz }) => {
  const userAnswers = useAppSelector(selectUserAnswers);

  return (
    <div className="quiz-result">
      {Object.values(quiz.answers).map((question, index) => {
        const questionMap = Object.values(question);

        return (
          <div key={index} className="question">
            <span className="question-index">{`Pytanie nr ${index + 1}`}</span>

            {questionMap.map((answer, i) => {
              const userAnswer = userAnswers[index] as answerValuesType;

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
    </div>
  );
};

export default QuizResult;
