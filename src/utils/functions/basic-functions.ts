import { questionType, quizzType } from "../../store/quizzes/quizz-types";

export const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

export const getRandomQuizes = (howManyQuizes: number, quizzes: quizzType[]) => {
  let safeguard = 0;

  if (howManyQuizes <= quizzes.length) {
    const indexes = Array.from(Array(quizzes.length).keys());
    const randomQuizzes: quizzType[] = [];

    for (let i = 1; i <= howManyQuizes; i++) {
      const index = getRandomNumber(indexes.length - 1);

      if (randomQuizzes.find(el => el.uid === quizzes[indexes[index]].uid) === undefined) {
        randomQuizzes.push(quizzes[indexes[index]]);
        indexes.splice(index, 1);
      } else i--;

      if (safeguard > 100) break;
      safeguard++;
    }

    return randomQuizzes;
  } else return [];
};

export const findEmptyTextInAnswers = (questions: questionType[]) => {
  return questions.reduce((acc: number[], question, index) => {
    const arrOfEmptyAnswers = question.answers.filter(answer => answer.text.length < 2);

    if (arrOfEmptyAnswers.length !== 0) acc.push(index);

    return acc;
  }, []);
};

export const findEmptyTextInQuestions = (questions: questionType[]) => {
  return questions.reduce((acc: number[], question, index) => {
    if (question.question.length === 0) acc.push(index);

    return acc;
  }, []);
};

export const validateQuiz = (Quiz: quizzType): string | boolean => {
  console.log(Quiz);

  if (Quiz.questions.length <= 1) return "You need add more answers";
  else if (!Quiz.title && Quiz.title.length <= 25) return "You forgot about title or your title have more than 25 leeters";
  else if (!Quiz.author || !Quiz.authorUID) return "Something is wrong with your loggin session";
  else if (!Quiz.uid) return "something went wrong";
  else if (findEmptyTextInAnswers(Quiz.questions).length > 0) return "your answers are empty";
  else if (findEmptyTextInQuestions(Quiz.questions).length > 0) return "your questions are empty";
  else return true;
};
