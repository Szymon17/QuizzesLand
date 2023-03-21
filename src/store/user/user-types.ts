export type userQuizSnapshot = { uid: string; title: string };

export type userSnapshotType = {
  displayName: string;
  email: string;
  id: string;
  userQuizzes: userQuizSnapshot[];
  solvedQuizzes: string[];
};
