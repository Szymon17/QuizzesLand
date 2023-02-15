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
};

const Answer: FC<answerPropTypes> = ({ answer, changeAnsweredState }) => {
  const dispatch = useAppDispatch();

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (changeAnsweredState) changeAnsweredState();

    if (answer) {
      dispatch(addUserAnswer(answer));
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
