import "./Question-panel.styles.css";
import { FC, MouseEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormInput from "../Form-input/Form-input.component";
import Button, { BUTTON_CLASSES } from "../Button/Button.component";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectQuestion } from "../../store/create-quiz/create-quiz-selector";
import { newAnswer, updateQuestion } from "../../store/create-quiz/create-quiz-reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faAdd } from "@fortawesome/free-solid-svg-icons";
import CreatedAnswer from "../created-answer/Created-answer.component";

type questionPanelProps = {
  questionIndex: number;
  open: boolean;
  clickHandler: Function;
};

const QuestionPanel: FC<questionPanelProps> = ({ questionIndex, clickHandler, open }) => {
  const dispatch = useAppDispatch();

  const question = useAppSelector(selectQuestion(questionIndex));
  const answers = question.answers;

  const emptyQuestionsCount = 4 - answers.length;
  const arrayWithEmptyAnswers = new Array(emptyQuestionsCount).fill("empty");

  const expandQuestion = () => clickHandler(questionIndex);

  const addNewAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(newAnswer(questionIndex));
  };

  const updateQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(updateQuestion({ questionIndex, text: e.target.value }));
  };

  return (
    <div className="question-container">
      <div className="extend-question-panel" onClick={expandQuestion}>
        <FontAwesomeIcon className="extend-icon" icon={faChevronDown} />
        <span className="question-count">pytanie nr {questionIndex + 1}</span>
      </div>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            className="add-question"
            initial={{ height: 0 }}
            animate={{ height: "250px" }}
            exit={{ height: "20px" }}
            transition={{ duration: 0.3, ease: "linear" }}
          >
            <FormInput placeholder="Pytanie" value={question.question} onChange={updateQuestionHandler} description="" />

            <div className="answers-block">
              {answers.map((answer, answerIndex) => (
                <CreatedAnswer key={answerIndex} questionIndex={questionIndex} answerIndex={answerIndex} answer={answer} />
              ))}
              {arrayWithEmptyAnswers.map((___, index) => {
                if (index === 0)
                  return (
                    <Button key={index} onClick={addNewAnswer} buttonType={BUTTON_CLASSES.neon_blue}>
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuestionPanel;
