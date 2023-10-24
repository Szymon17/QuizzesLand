export type userQuizSnapshot = { uid: string; title: string };

export type userRegisterData = {
  email: string;
  displayName: string;
  password: string;
  confirmedPassword: string;
};

export type userSnapshotType = {
  displayName: string;
  email: string;
  id: string;
  userQuizzes: userQuizSnapshot[];
  solvedQuizzes: string[];
};
