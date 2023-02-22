import "./Create-quiz.styles.css";
import { useState, MouseEvent, ChangeEvent } from "react";
import FormInput from "../../components/Form-input/Form-input.component";
import { questionType } from "../../store/quizzes/quizz-types";
import QuestionPanel from "../../components/Question-panel/Question-panel.component";

const emptyQuestion = {
  question: "",
  answers: [{ text: "", correct: false, id: 1 }],
};

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<questionType[]>([emptyQuestion]);
  const [openedQestions, setOpenedQuestions] = useState([true]);

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

  const controlOpenState = (index: number) => {
    const coppyOfArray = openedQestions;
    coppyOfArray[index] = !coppyOfArray[index];

    if (coppyOfArray.filter(el => el).length > 1) coppyOfArray.forEach(el => (el = false));
    // coppyOfArray[coppyOfArray.length - 1] = true;

    console.log(coppyOfArray);
    setOpenedQuestions([...coppyOfArray]);
  };

  return (
    <form className="create-quiz">
      <div className="create-quiz-container">
        <FormInput description="Tytuł" />
        <textarea placeholder="Opis" />

        <div className="question-container">
          {questions.map((question, questionIndex) => (
            <QuestionPanel
              key={questionIndex}
              question={question}
              questionIndex={questionIndex}
              changeText={changeText}
              createAnswerInput={createAnswerInput}
              clickHandler={controlOpenState}
              open={openedQestions[questionIndex]}
            />
          ))}
        </div>
      </div>
    </form>
  );
};

export default CreateQuiz;
