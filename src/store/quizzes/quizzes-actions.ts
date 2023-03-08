import { createAsyncThunk } from "@reduxjs/toolkit";
import { getQuizzesByIndex } from "../../utils/firebase/firebase";
import { quizzType } from "./quizz-types";

export const replaceFetchQuizzes = createAsyncThunk("fetch and replace quizzes", async (numberOfDocs: number): Promise<quizzType[]> => {
  const quizzes = await getQuizzesByIndex(numberOfDocs);

  if (quizzes) return quizzes as quizzType[];
  else return [];
});

export const addFetchQuizzes = createAsyncThunk(
  "fetch and add quizzes",
  async ({ numberOfDocs, fromIndexCount }: { numberOfDocs: number; fromIndexCount: number }): Promise<quizzType[]> => {
    const quizzes = await getQuizzesByIndex(numberOfDocs, fromIndexCount);

    if (quizzes) return quizzes as quizzType[];
    else return [];
  }
);
