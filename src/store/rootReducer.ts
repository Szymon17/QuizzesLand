import { combineReducers } from "redux";
import answersReducer from "./answers/answers-reducer";
import quizzesReducer from "./quizzes/quizzes-reducer";

export const rootReducer = combineReducers({
  quizzes: quizzesReducer,
  answers: answersReducer,
});
