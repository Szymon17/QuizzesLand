import { validateQuiz } from "../functions/basic-functions";

describe("quiz test", () => {
  const quiz = {
    title: "random",
    authorUID: "randomIterals",
    author: "test",
    description: "dasdasdsa",
    uid: "dsadas5fdsadas",
    likes: 5,
    index: 5,
    questions: [
      {
        question: "this is simpre question",
        answers: [{ text: "this is first answer", correct: true, id: 1 }],
      },
      {
        question: "this is simpre question",
        answers: [
          { text: "this is first answer", correct: true, id: 1 },
          { text: "this is first answer", correct: true, id: 2 },
        ],
      },
    ],
  };

  test("correct passing a quiz", () => expect(validateQuiz(quiz)).toBeTruthy());

  describe("Catch missing propertys", () => {
    test("Title", () => {
      const quizWithoutTitle = quiz;
      quizWithoutTitle.title = "";
      expect(() => validateQuiz(quizWithoutTitle)).toThrow(Error);
    });

    test("Answers", () => {
      const quizWithoutAnswers = quiz;
      quizWithoutAnswers.questions = [
        {
          question: "simple question",
          answers: [{ text: "this is first answer", correct: true, id: 1 }],
        },
      ];
      expect(() => validateQuiz(quizWithoutAnswers)).toThrow(Error);
    });

    test("authorUID & author", () => {
      const quizWithoutAuthor = quiz;
      quizWithoutAuthor.author = "";
      expect(() => validateQuiz(quizWithoutAuthor)).toThrow(Error);

      quizWithoutAuthor.authorUID = "";
      expect(() => validateQuiz(quizWithoutAuthor)).toThrow(Error);
    });

    test("UID", () => {
      const quizWithoutUID = quiz;
      quizWithoutUID.uid = "";
      expect(() => validateQuiz(quizWithoutUID)).toThrow(Error);
    });

    test("Empty Answers", () => {
      const quizWithEmptyAnswer = quiz;
      quizWithEmptyAnswer.questions[0].answers[0].text = "";
      expect(() => validateQuiz(quizWithEmptyAnswer)).toThrow(Error);
    });
  });
});
