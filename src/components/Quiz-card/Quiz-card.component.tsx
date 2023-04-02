import "./Quiz-card.styles.css";
import { FC } from "react";
import { quizzType } from "../../store/quizzes/quizz-types";
import Button, { BUTTON_CLASSES } from "../Button/Button.component";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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
        <span className="quizz-likes">
          <FontAwesomeIcon icon={faHeart} />
          <span className="quizz-likes-count">{quiz.likes}</span>
        </span>
        <Button buttonType={BUTTON_CLASSES.base_reverse} onClick={navigateHandler}>
          Przejdź do quizu
        </Button>
      </footer>
    </div>
  );
};

export default QuizCard;
