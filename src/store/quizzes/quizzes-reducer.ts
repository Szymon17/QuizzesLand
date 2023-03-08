import { createSlice } from "@reduxjs/toolkit";
import { getDocumentsCount, updateLikesDB } from "../../utils/firebase/firebase";
import { quizzType } from "./quizz-types";
import { addFetchQuizzes, replaceFetchQuizzes } from "./quizzes-actions";

type initialStateType = {
  user_delay_time: number;
  quizzes: quizzType[];
  status: "idle" | "loading" | "failed";
};

const initialState: initialStateType = {
  user_delay_time: 0,
  quizzes: [],
  status: "idle",
};

export const quizzesSlice = createSlice({
  name: "quizzesSlice",
  initialState: initialState,
  reducers: {
    updateQuizLikes: (state, action) => {
      const quizToUpdate = action.payload;
      const index = state.quizzes.findIndex(quiz => quiz.uid === quizToUpdate.uid);

      state.quizzes[index].likes += 1;
      updateLikesDB(quizToUpdate);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(replaceFetchQuizzes.pending, state => {
        state.status = "loading";
      })

      .addCase(replaceFetchQuizzes.fulfilled, (state, action) => {
        const delayTime = 5 * 60 * 1000;
        const actualTime = new Date().getTime();

        state.status = "idle";
        if (state.quizzes.length >= 50) state.quizzes = initialState.quizzes;
        state.quizzes = [...action.payload];

        state.user_delay_time = actualTime + delayTime;
      })

      .addCase(replaceFetchQuizzes.rejected, state => {
        state.status = "failed";
        throw Error("rejected");
      });

    builder
      .addCase(addFetchQuizzes.pending, state => {
        state.status = "loading";
      })
      .addCase(addFetchQuizzes.fulfilled, (state, action) => {
        const delayTime = 5 * 60 * 1000;
        const actualTime = new Date().getTime();

        state.status = "idle";
        if (state.quizzes.length >= 50) state.quizzes = initialState.quizzes;
        state.quizzes = [...state.quizzes, ...action.payload];

        state.user_delay_time = actualTime + delayTime;
      })
      .addCase(addFetchQuizzes.rejected, state => {
        state.status = "failed";
      });
  },
});

export const { updateQuizLikes } = quizzesSlice.actions;

export default quizzesSlice.reducer;
