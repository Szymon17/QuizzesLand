import "./QuizItem.styles.css";
import { FC, useState } from "react";
import { quizzType } from "../../store/quizzes/quizz-types";
import Button from "../Button/Button.component";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

type quizProps = {
  quiz: quizzType;
};

const QuizItem: FC<quizProps> = ({ quiz }) => {
  const [isOpen, setOpenState] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div whileHover={{ scale: 1.03 }} onHoverStart={() => setOpenState(true)} onHoverEnd={() => setOpenState(false)} className="quiz-item">
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
