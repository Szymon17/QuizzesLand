import { createSelector } from "@reduxjs/toolkit";
import { stateType } from "../store";

const selectReducer = (state: stateType) => state.createQuiz;

export const selectQuiz = createSelector([selectReducer], createQuiz => {
  return {
    description: createQuiz.description,
    questions: createQuiz.questions,
    title: createQuiz.title,
  };
});

export const selectQuestions = createSelector([selectReducer], createQuiz => createQuiz.questions);

export const selectArrayWithCreatedQuizIndexes = createSelector([selectReducer], createQuiz => {
  return createQuiz.questions.map((___, index) => index);
});

export const selectQuestion = (questionIndex: number) => createSelector([selectReducer], createQuiz => createQuiz.questions[questionIndex]);

export const selectAnswers = (questionIndex: number) => createSelector([selectReducer], createQuiz => createQuiz.questions[questionIndex].answers);

export const selectOpenStateArray = createSelector([selectReducer], reducer => reducer.openState);
