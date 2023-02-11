import { combineReducers } from "redux";
import quizzesReducer from "./quizzes/quizzes-reducer";

export const rootReducer = combineReducers({
  quizzes: quizzesReducer,
});
