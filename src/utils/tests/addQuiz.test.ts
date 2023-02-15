import { validateQuiz } from "../firebase/firebase";

describe("quiz test", () => {
  const quiz = {
    title: "random",
    authorUID: "randomIterals",
    author: "test",
    description: "dasdasdsa",
    uid: "dsadas5fdsadas",
    likes: 5,
    answers: [
      {
        1: { text: "this is first answer", correct: true, id: 1 },
      },
      {
        1: { text: "this is first answer", correct: true, id: 1 },
        2: { text: "this is first answer", correct: true, id: 2 },
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
      quizWithoutAnswers.answers = [
        {
          1: { text: "this is first answer", correct: true, id: 1 },
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
  });
});
