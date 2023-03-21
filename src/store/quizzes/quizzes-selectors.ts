import { stateType } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { getRandomQuizes } from "../../utils/functions/basic-functions";

const selectQuizzesStore = (store: stateType) => store.quizzes;

export const selectStatus = createSelector([selectQuizzesStore], ({ status }) => status);

export const selectQuizzes = createSelector([selectQuizzesStore], ({ quizzes }) => quizzes);

export const selectQuizById = (uid: string) => createSelector([selectQuizzesStore], ({ quizzes }) => quizzes.find(quiz => quiz.uid === uid));

export const selectRandomQuizes = (howManyQuizes: number = 1) => createSelector([selectQuizzes], quizzes => getRandomQuizes(howManyQuizes, quizzes));

export const selectUserDelayTime = createSelector([selectQuizzesStore], store => store.user_fetch_delay_time);

export const selectUserEditDelayTime = createSelector([selectQuizzesStore], store => store.user_edit_time_delay);

export const selectUserDeleteDelayTime = createSelector([selectQuizzesStore], store => store.user_delete_time_delay);
