import "./QuizItem.styles.css";
import { FC, useState } from "react";
import { quizzType } from "../../store/quizzes/quizz-types";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button/Button.component";
import { isMobile } from "../../utils/functions/mobile-check";

type quizProps = {
  quiz: quizzType;
};

const QuizItem: FC<quizProps> = ({ quiz }) => {
  const [isOpen, setOpenState] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onHoverStart={() => (isMobile ? null : setOpenState(true))}
      onHoverEnd={() => (isMobile ? null : setOpenState(false))}
      onTap={() => (isMobile ? (isOpen ? setOpenState(false) : setOpenState(true)) : null)}
      className="quiz-item"
    >
      <div className="quiz-item-left">
        <h1 className="quiz-item-title">{quiz.title}</h1>
        <p className="quiz-item-description">{quiz.description}</p>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="quiz-item-right">
            <Button onClick={() => navigate(`/quiz/${quiz.uid}`)}>Przejdź do quizu</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuizItem;
