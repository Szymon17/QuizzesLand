import "./Answer.styles.css";
import { FC, MouseEventHandler } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addUserAnswer } from "../../store/answers/answers-reducer";
import Button, { BUTTON_CLASSES } from "../Button/Button.component";
import { useAppDispatch } from "../../store/hooks";
import { answerValuesType } from "../../store/answers/answers-types";

type answerPropTypes = {
  answer: answerValuesType;
  changeAnsweredState?: Function;
  animationTime?: number;
};

const Answer: FC<answerPropTypes> = ({ answer, changeAnsweredState, animationTime }) => {
  const dispatch = useAppDispatch();

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (changeAnsweredState) changeAnsweredState();

    if (answer && answer.text && answer.correct) {
      if (animationTime) setTimeout(() => dispatch(addUserAnswer(answer)), animationTime);
      else dispatch(addUserAnswer(answer));
    }
  };

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div className="Answer">
        <Button buttonType={BUTTON_CLASSES.base} onClick={onClickHandler}>
          {answer.text}
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Answer;
