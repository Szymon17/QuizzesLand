import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { answerValuesType } from "./answers-types";

type initialStateTypes = {
  userAnswers: answerValuesType[];
};

type actionType = AnyAction & {
  payload: answerValuesType;
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
  },
});

export const { addUserAnswer } = answersSlice.actions;

export default answersSlice.reducer;
