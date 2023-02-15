import "./Quiz-card.styles.css";
import { FC } from "react";
import { quizzType } from "../../store/quizzes/quizz-types";
import Button, { BUTTON_CLASSES } from "../Button/Button.component";
import { useNavigate } from "react-router";

type QuizCardParamsType = {
  quiz: quizzType;
};

const QuizCard: FC<QuizCardParamsType> = ({ quiz }) => {
  const navigate = useNavigate();

  const navigateHandler = () => navigate(`/quiz/${quiz.uid}`);

  return (
    <div className="quiz-card">
      <div className="quiz-card-title-container">
        <h1 className="quiz-card-title">{quiz.title}</h1>
      </div>
      <p className="quiz-description">{quiz.description}</p>
      <footer className="quizz-footer">
        <span className="quizz-likes">{quiz.likes}</span>
        <Button buttonType={BUTTON_CLASSES.neon_blue} onClick={navigateHandler}>
          Przejdź do quizu
        </Button>
      </footer>
    </div>
  );
};

export default QuizCard;
