import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDocumentsCount, updateLikesDB } from "../../utils/firebase/firebase";
import { quizzType, updateQuizParams } from "./quizz-types";
import { addFetchQuizzes, replaceFetchQuizzes } from "./quizzes-actions";

type initialStateType = {
  user_fetch_delay_time: number;
  user_edit_time_delay: number;
  user_delete_time_delay: number;
  quizzes: quizzType[];
  status: "idle" | "loading" | "failed";
};

const initialState: initialStateType = {
  user_fetch_delay_time: 0,
  user_edit_time_delay: 0,
  user_delete_time_delay: 0,
  quizzes: [],
  status: "idle",
};

const delayTime = 5 * 60 * 1000;

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

    addQuizToReducer: (state, action: PayloadAction<quizzType>) => {
      state.quizzes.push(action.payload);
    },

    updateQuizParamsInReducer: (state, action: PayloadAction<{ params: updateQuizParams; uid: string }>) => {
      const {
        payload: { uid, params },
      } = action;

      const index = state.quizzes.findIndex(quiz => quiz.uid === uid);

      state.quizzes[index].title = params.title;
      state.quizzes[index].description = params.description;
      state.quizzes[index].questions = params.questions;

      const actualTime = new Date().getTime();
      state.user_edit_time_delay = actualTime + delayTime;
    },

    deleteQuizFromReducer: (state, action: PayloadAction<string>) => {
      const uid = action.payload;

      state.quizzes = state.quizzes.filter(quiz => quiz.uid !== uid);

      const actualTime = new Date().getTime();
      state.user_delete_time_delay = actualTime + delayTime;

      console.log(actualTime + delayTime);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(replaceFetchQuizzes.pending, state => {
        state.status = "loading";
      })

      .addCase(replaceFetchQuizzes.fulfilled, (state, action) => {
        const actualTime = new Date().getTime();

        state.status = "idle";
        if (state.quizzes.length >= 50) state.quizzes = initialState.quizzes;
        state.quizzes = [...action.payload];

        state.user_fetch_delay_time = actualTime + delayTime;
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

        state.user_fetch_delay_time = actualTime + delayTime;
      })
      .addCase(addFetchQuizzes.rejected, state => {
        state.status = "failed";
      });
  },
});

export const { updateQuizLikes, addQuizToReducer, updateQuizParamsInReducer, deleteQuizFromReducer } = quizzesSlice.actions;

export default quizzesSlice.reducer;
