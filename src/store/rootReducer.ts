import { combineReducers } from "redux";
import answersReducer from "./answers/answers-reducer";
import quizzesReducer from "./quizzes/quizzes-reducer";
import userReducer from "./user/user-reducer";
import createQuizReducer from "./create-quiz/create-quiz-reducer";

export const rootReducer = combineReducers({
  quizzes: quizzesReducer,
  answers: answersReducer,
  user: userReducer,
  createQuiz: createQuizReducer,
});
