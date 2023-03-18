import { createSelector } from "@reduxjs/toolkit";
import { stateType } from "../store";

const selectUserSelector = (state: stateType) => state.user;

export const selectUser = createSelector([selectUserSelector], ({ user }) => user);

export const selectUserQuiz = (uid: string | undefined) =>
  createSelector([selectUserSelector], ({ user }) => user?.userQuizzes.filter(quiz => quiz.uid === uid)[0]);

export const selectUserSolvedQuizzes = createSelector([selectUser], user => {
  if (user?.solvedQuizzes) return user.solvedQuizzes;
});
