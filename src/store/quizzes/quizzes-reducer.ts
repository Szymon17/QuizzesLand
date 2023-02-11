import { createSlice } from "@reduxjs/toolkit";
import { quizzType } from "./quizz-types";
import { fetchQuizes } from "./quizzes-actions";

type initialStateType = {
  quizzes: quizzType[];
  status: "idle" | "loading" | "failed";
};

const initialState: initialStateType = {
  quizzes: [],
  status: "idle",
};

export const quizzesSlice = createSlice({
  name: "quizzesSlice",
  initialState: initialState,
  reducers: {
    clearQuizzes: state => {
      state.quizzes = initialState.quizzes;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchQuizes.pending, state => {
        state.status = "loading";
      })

      .addCase(fetchQuizes.fulfilled, (state, action) => {
        state.status = "idle";
        state.quizzes = [...state.quizzes, ...action.payload];
      })
      .addCase(fetchQuizes.rejected, state => {
        state.status = "failed";
        throw Error("you can not fetch more than 10 quizzes");
      });
  },
});

export default quizzesSlice.reducer;
