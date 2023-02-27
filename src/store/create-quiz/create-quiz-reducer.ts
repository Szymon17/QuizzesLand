import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { questionType } from "../quizzes/quizz-types";
import { questionIndexes, updateAnswerType } from "./create-quiz-types";

type initialStateTypes = {
  questions: questionType[];
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

    removeAnswer: (state, action: PayloadAction<questionIndexes>) => {
      const {
        payload: { questionIndex, answerIndex },
      } = action;

      state.questions[questionIndex].answers.splice(answerIndex, 1);
    },
  },
});

export const { newAnswer, addEmptyQuestion, updateAnswer, removeAnswer } = createQuizSlice.actions;

export default createQuizSlice.reducer;
