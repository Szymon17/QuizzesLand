import "./Question-panel.styles.css";
import { FC, MouseEvent, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectQuestion } from "../../store/create-quiz/create-quiz-selector";
import { newAnswer, removeQuestion, updateQuestion } from "../../store/create-quiz/create-quiz-reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";

import FormInput from "../Form-input/Form-input.component";
import Button, { BUTTON_CLASSES } from "../Button/Button.component";
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
    <div className="question">
      <span className="question__questionNumber">Pytanie nr {questionIndex + 1}</span>
      <FontAwesomeIcon className="question__deleteIcon" onClick={e => deleteQuestion(e)} icon={faTrash}></FontAwesomeIcon>

      <div className="question__addQuestion">
        <FormInput
          incorrect={question.question.length < 5 && question.question.length !== 0}
          placeholder="Pytanie"
          value={question.question}
          onChange={updateQuestionHandler}
          name="question"
        />

        <div className="question__answersBlock">
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
      </div>
    </div>
  );
};

export default QuestionPanel;
