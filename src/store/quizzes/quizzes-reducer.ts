import { createSlice, createSelector } from "@reduxjs/toolkit";
import { stateType } from "../store";
import { getRandomQuiz, quizzType } from "../../utils/firebase/firebase";

type initialStateType = {
  quizzes: quizzType[];
};

const initialState: initialStateType = {
  quizzes: [],
};

export const quizzesSlice = createSlice({
  name: "quizzesSlice",
  initialState: initialState,
  reducers: {
    getCategories: state => {
      // const random5Quizes = getRandomQuiz();
      state.quizzes = [];
    },
  },
});

const selectQuizzesStore = (store: stateType) => store.quizzes;
export const selectQuizzes = createSelector([selectQuizzesStore], ({ quizzes }) => quizzes);

export default quizzesSlice.reducer;
