import "./Question-panel.styles.css";
import { FC, useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questionType } from "../../store/quizzes/quizz-types";
import FormInput from "../Form-input/Form-input.component";
import Button, { BUTTON_CLASSES } from "../Button/Button.component";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectAnswers } from "../../store/create-quiz/create-quiz-selector";
import { newAnswer } from "../../store/create-quiz/create-quiz-reducer";

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

            <div className="answer-container">
              {answers.map((___, answerIndex) => {
                return <FormInput placeholder="dodaj odpowiedź" key={answerIndex} description="" />;
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
