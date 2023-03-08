import { quizzType } from "../quizzes/quizz-types";

export type userSnapshotType = {
  displayName: string;
  email: string;
  id: string;
  userQuizzes: quizzType[];
  solvedQuizzes: string[];
};
