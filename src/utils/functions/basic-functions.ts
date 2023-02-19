import { quizzType } from "../../store/quizzes/quizz-types";

export const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

export const getRandomQuizes = (howManyQuizes: number, quizzes: quizzType[]) => {
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
};
