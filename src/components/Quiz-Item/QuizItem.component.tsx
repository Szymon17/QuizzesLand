import "./QuizItem.styles.css";
import { FC } from "react";
import { quizzType } from "../../store/quizzes/quizz-types";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button.component";

type quizProps = { quiz: quizzType };

const QuizItem: FC<quizProps> = ({ quiz }) => {
  const navigate = useNavigate();

  return (
    <div className="quizItem">
      <div className="quizItem__title">
        <h1 className="quizItem__title-title">{quiz.title}</h1>
        <span className="quizItem__title-heart">
          <FontAwesomeIcon className="heart-icon" icon={faHeart} />
          {quiz.likes}
        </span>
      </div>
      <p className="quizItem__description">{quiz.description}</p>
      <footer className="quizItem__footer">
        <Button onClick={() => navigate(`/quiz/${quiz.uid}`)}>Przejdź do quizu</Button>
        <span className="quizItem__questionCount">Ilość pytań: {quiz.questions.length}</span>
      </footer>
    </div>
  );
};

export default QuizItem;
