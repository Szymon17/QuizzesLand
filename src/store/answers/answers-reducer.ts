import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { answerType } from "../quizzes/quizz-types";

type initialStateTypes = {
  userAnswers: answerType[];
};

type actionType = AnyAction & {
  payload: answerType;
};

const initialState: initialStateTypes = {
  userAnswers: [],
};

const answersSlice = createSlice({
  name: "answersSlice",
  initialState: initialState,
  reducers: {
    addUserAnswer: (state, action: actionType) => {
      state.userAnswers.push(action.payload);
    },

    resetUserAnswers: state => {
      state.userAnswers = [];
    },
  },
});

export const { addUserAnswer, resetUserAnswers } = answersSlice.actions;

export default answersSlice.reducer;
