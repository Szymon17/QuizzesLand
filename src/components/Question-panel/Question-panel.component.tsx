import "./Question-panel.styles.css";
import { FC, MouseEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormInput from "../Form-input/Form-input.component";
import Button, { BUTTON_CLASSES } from "../Button/Button.component";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectAnswers } from "../../store/create-quiz/create-quiz-selector";
import { newAnswer, updateAnswer } from "../../store/create-quiz/create-quiz-reducer";

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

    if (text.length > 3) {
      dispatch(updateAnswer({ questionIndex, answerIndex, params: { text } }));
    }
  };

  const updateAnswerCorrect = (e: MouseEvent<HTMLButtonElement>, questionIndex: number, answerIndex: number) => {
    e.preventDefault();
    const correct = !answers[answerIndex].correct;

    dispatch(updateAnswer({ questionIndex, answerIndex, params: { correct } }));
  };

  return (
    <>
      <div onClick={expandQuestion}>XD</div>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            className="add-question"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FormInput description="Question" />

            <div className="answers-block">
              {answers.map((answer, answerIndex) => {
                return (
                  <div className="answer-container" key={answerIndex}>
                    <FormInput placeholder="dodaj odpowiedź" onChange={e => updateAnswerText(e, questionIndex, answerIndex)} description="" />
                    <Button onClick={e => updateAnswerCorrect(e, questionIndex, answerIndex)}>{answer.correct.toString()}</Button>
                  </div>
                );
              })}
              {arrayWithEmptyAnswers.map((___, index) => {
                if (index === 0) return <Button key={index} onClick={addNewAnswer} buttonType={BUTTON_CLASSES.neon_blue}></Button>;
                else return <Button key={index} onClick={e => e.preventDefault()} buttonType={BUTTON_CLASSES.base_disabled}></Button>;
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuestionPanel;
