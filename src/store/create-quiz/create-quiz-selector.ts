import { createSelector } from "@reduxjs/toolkit";
import { stateType } from "../store";

const selectReducer = (state: stateType) => state.createQuiz;

export const selectQuestions = createSelector([selectReducer], createQuiz => createQuiz.questions);

export const selectAnswers = (questionIndex: number) => createSelector([selectReducer], createQuiz => createQuiz.questions[questionIndex].answers);
