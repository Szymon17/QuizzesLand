import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRandomQuiz } from "../../utils/firebase/firebase";
import { quizzType } from "./quizz-types";

export const fetchQuizes = createAsyncThunk("fetch quizzes", async (numberOfDocs: number = 1): Promise<quizzType[]> => {
  const response = await getRandomQuiz(numberOfDocs);

  if (response) return response as quizzType[];
  else return [];
});
