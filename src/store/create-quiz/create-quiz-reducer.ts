import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { questionType, answerType, quizzType } from "../quizzes/quizz-types";

type initialStateTypes = {
  questions: questionType[];
};

type answerPayloadType = {
  index: number;
  answer: answerType;
};

const initialState: initialStateTypes = {
  questions: [{ question: "", answers: [{ text: "", correct: false, id: 1 }] }],
};

const createQuizSlice = createSlice({
  name: "create-quiz",
  initialState: initialState,
  reducers: {
    addAnswer: (state, action: PayloadAction<answerPayloadType>) => {
      const {
        payload: { index, answer },
      } = action;

      state.questions[index].answers.push(answer);
    },

    addEmptyQuestion: (state, action: PayloadAction<questionType>) => {
      const { payload } = action;

      state.questions.push(payload);
    },
  },
});

export const { addAnswer, addEmptyQuestion } = createQuizSlice.actions;

export default createQuizSlice.reducer;
