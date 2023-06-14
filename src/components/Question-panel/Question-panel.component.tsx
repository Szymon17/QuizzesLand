import "./Question-panel.styles.css";
import { FC, MouseEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import FormInput from "../Form-input/Form-input.component";
import Button, { BUTTON_CLASSES } from "../Button/Button.component";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectQuestion } from "../../store/create-quiz/create-quiz-selector";
import { newAnswer, removeQuestion, updateQuestion } from "../../store/create-quiz/create-quiz-reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash, faClipboardQuestion } from "@fortawesome/free-solid-svg-icons";
import CreatedAnswer from "../New-answer/New-answer.component";

type questionPanelProps = {
  questionIndex: number;
};

const QuestionPanel: FC<questionPanelProps> = ({ questionIndex }) => {
  const dispatch = useAppDispatch();

  const question = useAppSelector(selectQuestion(questionIndex));
  const answers = question.answers;

  const emptyQuestionsCount = 4 - answers.length;
  const arrayWithEmptyAnswers = new Array(emptyQuestionsCount).fill("empty");

  const addNewAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(newAnswer(questionIndex));
  };

  const updateQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    dispatch(updateQuestion({ questionIndex, text: e.target.value }));
  };

  const deleteQuestion = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();
    dispatch(removeQuestion(questionIndex));
  };

  return (
    <motion.div className="question-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="question-container__top-panel">
        <FontAwesomeIcon className="icon" icon={faClipboardQuestion} />
        <FormInput
          incorrect={question.question.length < 5 && question.question.length !== 0}
          placeholder="Pytanie"
          value={question.question}
          onChange={updateQuestionHandler}
        />
        <FontAwesomeIcon className="delete-question-icon icon" onClick={e => deleteQuestion(e)} icon={faTrash}></FontAwesomeIcon>
      </div>
      <div className="answers-block">
        {answers.map((answer, answerIndex) => (
          <CreatedAnswer key={answerIndex} questionIndex={questionIndex} answerIndex={answerIndex} answer={answer} />
        ))}

        {arrayWithEmptyAnswers.map((___, index) => {
          if (index === 0)
            return (
              <Button key={index} onClick={addNewAnswer} buttonType={BUTTON_CLASSES.neon_orange}>
                <FontAwesomeIcon icon={faAdd} />
              </Button>
            );
          else
            return (
              <Button key={index} onClick={e => e.preventDefault()} buttonType={BUTTON_CLASSES.base_disabled}>
                <FontAwesomeIcon icon={faAdd} />
              </Button>
            );
        })}
      </div>
    </motion.div>
  );
};

export default QuestionPanel;
