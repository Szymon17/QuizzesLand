import { createSlice } from "@reduxjs/toolkit";
import { userSnapshotType } from "./user-types";
import { logInEmail } from "./user-actions";

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
  reducers: {},
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
  },
});

export default userSlice.reducer;
