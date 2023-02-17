import { stateType } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { quizzType } from "./quizz-types";
import { getRandomNumber } from "../../utils/functions/basic-functions";

const selectQuizzesStore = (store: stateType) => store.quizzes;

export const selectStatus = createSelector([selectQuizzesStore], ({ status }) => status);

export const selectQuizzes = createSelector([selectQuizzesStore], ({ quizzes }) => quizzes);

export const selectRandomQuizes = (howManyQuizes: number = 1) =>
  createSelector([selectQuizzes], quizzes => {
    if (howManyQuizes <= quizzes.length) {
      const indexes = Array.from(Array(quizzes.length).keys());
      const randomQuizzes: quizzType[] = [];

      for (let i = 1; i <= howManyQuizes; i++) {
        const index = getRandomNumber(indexes.length - 1);
        randomQuizzes.push(quizzes[indexes[index]]);
        indexes.splice(index, 1);
      }

      return randomQuizzes;
    } else return [];
  });
