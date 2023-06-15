import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userSnapshotType } from "./user-types";
import { logInEmail, checkUserSession } from "./user-actions";
import { logOut, updateUserSolvedQuizzes } from "../../utils/firebase/firebase";
import { quizzType } from "../quizzes/quizz-types";

type initialStateTypes = {
  user: userSnapshotType | null | void;
  status: "idle" | "loading" | "failed";
};

const initialState: initialStateTypes = {
  user: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user-slice",
  initialState: initialState,
  reducers: {
    logout: state => {
      state.user = null;
      logOut();
    },

    updateSolvedQuizzesUid: (state, action: PayloadAction<{ quiz: quizzType; user: userSnapshotType }>) => {
      const quizUid = action.payload.quiz.uid;
      const user = action.payload.user;

      if (state.user) {
        state.user.solvedQuizzes.push(quizUid);
        updateUserSolvedQuizzes(quizUid, user);
      }
    },

    updateUserQuizzes: (state, action: PayloadAction<quizzType>) => {
      const { payload } = action;

      if (state.user) state.user.userQuizzes.push(payload);
    },

    updateUserQuiz: (state, action: PayloadAction<{ title: string; uid: string }>) => {
      const { uid, title } = action.payload;

      if (state.user) {
        const index = state.user.userQuizzes.findIndex(quiz => quiz.uid === uid);
        state.user.userQuizzes[index].title = title;
      }
    },

    deleteUserQuizFromReducer: (state, action: PayloadAction<string>) => {
      const uid = action.payload;

      if (state.user) {
        state.user.userQuizzes = state.user.userQuizzes.filter(quiz => quiz.uid !== uid);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logInEmail.pending, state => {
        state.status = "loading";
      })
      .addCase(logInEmail.fulfilled, (state, action) => {
        const { payload } = action;

        state.user = payload;
        state.status = "idle";
      })
      .addCase(logInEmail.rejected, state => {
        state.status = "failed";
      });

    builder.addCase(checkUserSession.fulfilled, (state, action) => {
      const { payload } = action;

      state.user = payload;
    });
  },
});

export const { logout, updateSolvedQuizzesUid, updateUserQuizzes, updateUserQuiz, deleteUserQuizFromReducer } = userSlice.actions;

export default userSlice.reducer;
