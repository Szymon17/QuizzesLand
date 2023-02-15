import { createSelector } from "@reduxjs/toolkit";
import { stateType } from "../store";

const selectQuizzesStore = (store: stateType) => store.answers;

export const selectProgress = createSelector([selectQuizzesStore], answers => answers.userAnswers.length);

export const selectUserAnswers = createSelector([selectQuizzesStore], answers => answers.userAnswers);
// export const selectCorrectAnswersCount = createSelector([selectQuizzesStore], answers => answers);
