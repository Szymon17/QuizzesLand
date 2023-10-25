import { questionType } from "../quizzes/quizz-types";

export type questionIndexes = {
  questionIndex: number;
  answerIndex: number;
};

export type updateAnswerType = questionIndexes & {
  params: { text?: string; correct?: boolean };
};

export type updateQuestionType = {
  questionIndex: number;
  text: string;
};

export type initialStateTypes = {
  title: string;
  description: string;
  questions: questionType[];
};
