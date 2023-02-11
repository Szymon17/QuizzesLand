type answerType = {
  [key: number]:
    | {
        text: string;
        correct: boolean;
      }
    | undefined;
};

export type quizzType = {
  title: string;
  author: string;
  authorUID: string;
  description: string;
  answers: answerType[];
};
