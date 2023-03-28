import { createSelector } from "@reduxjs/toolkit";
import { stateType } from "../store";

const alertReducer = (state: stateType) => state.alertReducer;

export const selectAlertText = createSelector([alertReducer], reducer => reducer.text);
