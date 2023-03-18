export type answerType = {
  text: string;
  correct: boolean;
  id: number;
};

export type questionType = {
  question: string;
  answers: answerType[];
};

export type quizzType = {
  title: string;
  author: string;
  authorUID: string;
  description: string;
  uid: string;
  questions: questionType[];
  likes: number;
  index: number;
};

export type fakeQestionType = {
  question: string;
  answers: string[];
};

export type updateQuizParams = {
  title: string;
  description: string;
  questions: questionType[];
};
