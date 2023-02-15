import "./Fake-answer.styles.css";
import { FC } from "react";
import { motion } from "framer-motion";

import { answerValuesType } from "../../store/answers/answers-types";

type fakeAnswerPropTypes = {
  answer: answerValuesType;
  fake: boolean;
};

const FakeAnswer: FC<fakeAnswerPropTypes> = ({ answer, fake }) => {
  return (
    <motion.div className="Answer">
      <span className="disabled-choice">fake</span>
    </motion.div>
  );
};

export default FakeAnswer;
