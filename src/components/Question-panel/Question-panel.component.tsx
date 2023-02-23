import "./Question-panel.styles.css";
import { FC, useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questionType } from "../../store/quizzes/quizz-types";
import FormInput from "../Form-input/Form-input.component";
import Button, { BUTTON_CLASSES } from "../Button/Button.component";

type questionPanelProps = {
  question: questionType;
  questionIndex: number;
  open: boolean;
  clickHandler: Function;
};

const QuestionPanel: FC<questionPanelProps> = ({ question, questionIndex, clickHandler, open }) => {
  const [answers, setAnswers] = useState(question.answers);
  const emptyQuestionsCount = 4 - question.answers.length;
  const arrayWithEmptyAnswers = new Array(emptyQuestionsCount).fill("empty");

  const expandQuestion = () => clickHandler(questionIndex);

  const addNewAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const answersCoppy = answers;
    setAnswers(answersCoppy);
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
              {answers.map((answer, answerIndex) => {
                return <FormInput placeholder="dodaj odpowiedź" key={answerIndex} description="" />;
              })}
              {arrayWithEmptyAnswers.map((answer, index) => (
                <div key={index}>
                  <Button onClick={addNewAnswer} buttonType={BUTTON_CLASSES.neon_blue}>
                    empty
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuestionPanel;
