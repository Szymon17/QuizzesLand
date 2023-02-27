import "./Question-panel.styles.css";
import { FC, MouseEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormInput from "../Form-input/Form-input.component";
import Button, { BUTTON_CLASSES } from "../Button/Button.component";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectAnswers } from "../../store/create-quiz/create-quiz-selector";
import { newAnswer, updateAnswer, removeAnswer } from "../../store/create-quiz/create-quiz-reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrashCan, faCheck, faChevronDown, faAdd } from "@fortawesome/free-solid-svg-icons";

type questionPanelProps = {
  questionIndex: number;
  open: boolean;
  clickHandler: Function;
};

const QuestionPanel: FC<questionPanelProps> = ({ questionIndex, clickHandler, open }) => {
  const dispatch = useAppDispatch();
  const answers = useAppSelector(selectAnswers(questionIndex));

  const emptyQuestionsCount = 4 - answers.length;
  const arrayWithEmptyAnswers = new Array(emptyQuestionsCount).fill("empty");

  const expandQuestion = () => clickHandler(questionIndex);

  const addNewAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(newAnswer(questionIndex));
  };

  const updateAnswerText = (e: ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => {
    const text = e.target.value;
    console.log(answers[answerIndex].text.length);

    dispatch(updateAnswer({ questionIndex, answerIndex, params: { text } }));
  };

  const updateAnswerCorrect = (e: MouseEvent<HTMLButtonElement>, questionIndex: number, answerIndex: number) => {
    e.preventDefault();
    const correct = !answers[answerIndex].correct;

    dispatch(updateAnswer({ questionIndex, answerIndex, params: { correct } }));
  };

  const removeAnswerHandler = (e: MouseEvent<HTMLButtonElement>, questionIndex: number, answerIndex: number) => {
    e.preventDefault();
    dispatch(removeAnswer({ questionIndex, answerIndex }));
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
            <FormInput placeholder="Pytanie" description="" />

            <div className="answers-block">
              {answers.map((answer, answerIndex) => {
                return (
                  <div className="answer-container" key={answerIndex}>
                    {answer.text.length <= 3 && answer.text !== "" ? (
                      <FormInput
                        incorrect={true}
                        placeholder="dodaj odpowiedź"
                        onChange={e => updateAnswerText(e, questionIndex, answerIndex)}
                        description=""
                      />
                    ) : (
                      <FormInput
                        value={answer.text}
                        placeholder="dodaj odpowiedź"
                        onChange={e => updateAnswerText(e, questionIndex, answerIndex)}
                        description=""
                      />
                    )}

                    <Button
                      buttonType={answer.correct ? BUTTON_CLASSES.neon_green : BUTTON_CLASSES.neon_red}
                      onClick={e => updateAnswerCorrect(e, questionIndex, answerIndex)}
                    >
                      <FontAwesomeIcon icon={answer.correct ? faCheck : faXmark} />
                    </Button>

                    {answerIndex !== 0 ? (
                      <Button buttonType={BUTTON_CLASSES.neon_red} onClick={e => removeAnswerHandler(e, questionIndex, answerIndex)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </Button>
                    ) : (
                      <Button onClick={e => e.preventDefault()} buttonType={BUTTON_CLASSES.base_disabled}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </Button>
                    )}
                  </div>
                );
              })}
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
