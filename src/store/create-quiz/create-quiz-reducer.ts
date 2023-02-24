import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { questionType, answerType, quizzType } from "../quizzes/quizz-types";

type initialStateTypes = {
  questions: questionType[];
};

type answerPayloadType = {
  questionIndex: number;
  answer: answerType;
};

const initialState: initialStateTypes = {
  questions: [{ question: "", answers: [{ text: "", correct: false, id: 1 }] }],
};

const createQuizSlice = createSlice({
  name: "create-quiz",
  initialState: initialState,
  reducers: {
    newAnswer: (state, action: PayloadAction<number>) => {
      const { payload } = action;

      const answers = state.questions[payload].answers;
      const lastId = answers.length > 0 ? answers[answers.length - 1].id : 0;
      console.log(lastId, { text: "", correct: false, id: lastId + 1 });
      state.questions[payload].answers.push({ text: "", correct: false, id: lastId + 1 });
    },

    addEmptyQuestion: (state, action: PayloadAction<questionType>) => {
      const { payload } = action;

      state.questions.push(payload);
    },
  },
});

export const { newAnswer, addEmptyQuestion } = createQuizSlice.actions;

export default createQuizSlice.reducer;
