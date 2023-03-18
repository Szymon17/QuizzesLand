import { quizzType } from "../quizzes/quizz-types";

export type userSnapshotType = {
  displayName: string;
  email: string;
  id: string;
  userQuizzes: { uid: string; title: string }[];
  solvedQuizzes: string[];
};
