import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, MouseEvent } from "react";
import { questionType } from "../../store/quizzes/quizz-types";
import Button, { BUTTON_CLASSES } from "../Button/Button.component";
import FormInput from "../Form-input/Form-input.component";

type questionPanelProps = {
  question: questionType;
  questionIndex: number;
  createAnswerInput: Function;
  changeText: Function;
  open: boolean;
  clickHandler: Function;
};

const QuestionPanel: FC<questionPanelProps> = ({ question, questionIndex, createAnswerInput, changeText, clickHandler, open }) => {
  const emptyQuestionsCount = 4 - question.answers.length;
  const arrayWithEmptyAnswers = new Array(emptyQuestionsCount).fill("empty");

  const controlState = (e: MouseEvent<HTMLDivElement>) => clickHandler(questionIndex);

  return (
    <>
      <div onClick={controlState} className="top">
        XD
      </div>
      {open && (
        <div className="add-question">
          <div className="question-header">
            <FormInput description="Question" />
            <Button buttonType={BUTTON_CLASSES.neon_blue} onClick={e => createAnswerInput(e, questionIndex)}>
              <FontAwesomeIcon icon={faAdd} />
            </Button>
          </div>
          <div className="answer-container">
            {question.answers.map((answer, answerIndex) => {
              return (
                <FormInput placeholder="dodaj odpowiedź" onChange={e => changeText(e, questionIndex, answerIndex)} key={answerIndex} description="" />
              );
            })}
            {arrayWithEmptyAnswers.map((answer, index) => (
              <div key={index}>empty</div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionPanel;
