import { questionType, quizzType, updateQuizParams } from "../../store/quizzes/quizz-types";

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
    if (question.question.length < 5) acc.push(index);

    return acc;
  }, []);
};

export const validateQuizParamsToUpdate = (params: updateQuizParams) => {
  if (params.questions.length <= 1) return "Potrzebujesz więcej pytań";
  else if (!params.title && params.title.length <= 25) return "Tytuł musi zawierać maxymalnie 25 liter";
  else if (findEmptyTextInAnswers(params.questions).length > 0) return "Wszystie odpowiedzi muszą być wypełnione";
  else if (findEmptyTextInQuestions(params.questions).length > 0) return "Wszystkie pytania muszą zawierać więcej niż 5 liter";
  else return true;
};

export const validateQuiz = (Quiz: quizzType): string | boolean => {
  if (Quiz.questions.length <= 1) return "Potrzebujesz więcej pytań";
  else if (!Quiz.title && Quiz.title.length <= 25) return "Tytuł musi zawierać maxymalnie 25 liter";
  else if (!Quiz.author || !Quiz.authorUID) return "Zaloguj się aby uzyskać dostęp";
  else if (!Quiz.uid) return "Coś poszło nie tak";
  else if (Quiz.index < 0) return "Błąd połączenia z bazą danych";
  else if (findEmptyTextInAnswers(Quiz.questions).length > 0) return "Wszystie odpowiedzi muszą być wypełnione";
  else if (findEmptyTextInQuestions(Quiz.questions).length > 0) return "Wszystkie pytania muszą zawierać więcej niż 5 liter";
  else return true;
};

export const newOpenState = (numberOfQuestions: number) => {
  return Array(numberOfQuestions)
    .fill(false)
    .map((el, index) => {
      if (index === numberOfQuestions - 1) {
        return !el;
      } else return el;
    });
};

export const validateNewUser = (email: string, password: string, confirmedPassword: string, displayName: string): string | void => {
  if (email === "") return "Nie podałeś emailu";
  else if (displayName === "") return "Nie podałeś nazwy użytkownika";
  else if (password === "") return "Nie podałeś hasła";
  else if (password !== confirmedPassword) return "Hasła nie są takie same";
};
