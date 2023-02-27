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
