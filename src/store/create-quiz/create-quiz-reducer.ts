import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { questionType, answerType } from "../quizzes/quizz-types";

type initialStateTypes = {
  questions: questionType[];
};

type updateAnswerType = {
  questionIndex: number;
  answerIndex: number;
  params: { text?: string; correct?: boolean };
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

    updateAnswer: (state, action: PayloadAction<updateAnswerType>) => {
      const { answerIndex, questionIndex, params } = action.payload;
      const { text, correct } = params;

      if (text) {
        state.questions[questionIndex].answers[answerIndex].text = text;
        return;
      }

      if (correct !== undefined) {
        state.questions[questionIndex].answers[answerIndex].correct = correct;
        return;
      }
    },
  },
});

export const { newAnswer, addEmptyQuestion, updateAnswer } = createQuizSlice.actions;

export default createQuizSlice.reducer;
