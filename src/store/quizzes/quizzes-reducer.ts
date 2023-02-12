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
    updateQuizLikes: (state, action) => {
      const quizToUpdate = action.payload;
      // console.log(quizToUpdate);
      const index = state.quizzes.findIndex(quiz => quiz.uid === quizToUpdate.uid);
      state.quizzes[index].likes += 1;
      // console.log(state.quizzes[index].likes, "tyle ma lików po update");
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchQuizes.pending, state => {
        state.status = "loading";
      })

      .addCase(fetchQuizes.fulfilled, (state, action) => {
        state.status = "idle";
        if (state.quizzes.length >= 50) state.quizzes = initialState.quizzes;
        state.quizzes = [...state.quizzes, ...action.payload];
      })
      .addCase(fetchQuizes.rejected, state => {
        state.status = "failed";
        throw Error("you can not fetch more than 10 quizzes");
      });
  },
});

export const { updateQuizLikes } = quizzesSlice.actions;

export default quizzesSlice.reducer;
