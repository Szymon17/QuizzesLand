import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { questionType } from "../quizzes/quizz-types";
import { questionIndexes, updateAnswerType, updateQuestionType } from "./create-quiz-types";

type initialStateTypes = {
  title: string;
  description: string;
  questions: questionType[];
};

const initialState: initialStateTypes = {
  title: "",
  description: "",
  questions: [{ question: "", answers: [{ text: "", correct: false, id: 1 }] }],
};

const createQuizSlice = createSlice({
  name: "create-quiz",
  initialState: initialState,
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      const { payload } = action;

      state.title = payload;
    },

    updateDescription: (state, action: PayloadAction<string>) => {
      const { payload } = action;

      state.description = payload;
    },

    newAnswer: (state, action: PayloadAction<number>) => {
      const { payload } = action;

      const answers = state.questions[payload].answers;
      const lastId = answers.length > 0 ? answers[answers.length - 1].id : 0;

      state.questions[payload].answers.push({ text: "", correct: false, id: lastId + 1 });
    },

    updateAnswer: (state, action: PayloadAction<updateAnswerType>) => {
      const { answerIndex, questionIndex, params } = action.payload;
      const { text, correct } = params;

      if (text !== undefined) {
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

    addEmptyQuestion: (state, action: PayloadAction<questionType>) => {
      const { payload } = action;

      state.questions.push(payload);
    },

    updateQuestion: (state, action: PayloadAction<updateQuestionType>) => {
      const {
        payload: { questionIndex, text },
      } = action;

      state.questions[questionIndex].question = text;
    },

    removeQuestion: (state, action: PayloadAction<number>) => {
      state.questions.splice(action.payload, 1);
    },

    replaceQuestions: (state, action: PayloadAction<questionType[]>) => {
      state.questions = [...action.payload];
    },

    resetCreateQuizState: () => initialState,
  },
});

export const {
  newAnswer,
  addEmptyQuestion,
  updateAnswer,
  removeAnswer,
  updateQuestion,
  updateDescription,
  updateTitle,
  resetCreateQuizState,
  replaceQuestions,
  removeQuestion,
} = createQuizSlice.actions;

export default createQuizSlice.reducer;
