import { createSelector } from "@reduxjs/toolkit";
import { stateType } from "../store";

const selectUserSelector = (state: stateType) => state.user;

export const selectUser = createSelector([selectUserSelector], ({ user }) => user);
