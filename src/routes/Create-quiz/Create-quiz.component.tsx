import "./Create-quiz.styles.css";
import { useState, MouseEvent, ChangeEvent } from "react";
import FormInput from "../../components/Form-input/Form-input.component";
import Button, { BUTTON_CLASSES } from "../../components/Button/Button.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { answerType, questionType } from "../../store/quizzes/quizz-types";

const emptyQuestion = {
  question: "",
  answers: [{ text: "", correct: false, id: 1 }],
};

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<questionType[]>([emptyQuestion]);

  const createAnswerInput = (e: MouseEvent<HTMLButtonElement>, questionIndex: number) => {
    e.preventDefault();
  };

  const changeText = (e: ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => {
    console.log(questionIndex, answerIndex, questions);

    const coppyOfQuestions = questions;
    const question = questions[questionIndex];
    question.answers[answerIndex].text = e.target.value;

    coppyOfQuestions[questionIndex] = question;

    setQuestions([...coppyOfQuestions]);
  };

  return (
    <form className="create-quiz">
      <div className="create-quiz-container">
        <FormInput description="Tytuł" />
        <textarea placeholder="Opis" />

        <div className="question-container">
          {questions.map((question, questionIndex) => {
            const emptyQuestionsCount = 4 - question.answers.length;
            const arrayWithEmptyAnswers = new Array(emptyQuestionsCount).fill("empty");

            return (
              <div key={questionIndex} className="add-question">
                <div className="question-header">
                  <FormInput description="Question" />
                  <Button buttonType={BUTTON_CLASSES.neon_blue} onClick={e => createAnswerInput(e, questionIndex)}>
                    <FontAwesomeIcon icon={faAdd} />
                  </Button>
                </div>
                <div className="answer-container">
                  {question.answers.map((answer, answerIndex) => {
                    return (
                      <FormInput
                        placeholder="dodaj odpowiedź"
                        onChange={e => changeText(e, questionIndex, answerIndex)}
                        key={answerIndex}
                        description=""
                      />
                    );
                  })}
                  {arrayWithEmptyAnswers.map(answer => (
                    <div>empty</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
};

export default CreateQuiz;
