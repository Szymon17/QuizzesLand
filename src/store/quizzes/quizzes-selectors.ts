import { stateType } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { getRandomQuizes } from "../../utils/functions/basic-functions";

const selectQuizzesStore = (store: stateType) => store.quizzes;

export const selectStatus = createSelector([selectQuizzesStore], ({ status }) => status);

export const selectQuizzes = createSelector([selectQuizzesStore], ({ quizzes }) => quizzes);

export const selectRandomQuizes = (howManyQuizes: number = 1) => createSelector([selectQuizzes], quizzes => getRandomQuizes(howManyQuizes, quizzes));
