import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./reducer";

export const store = configureStore({
  reducer: {
    test: testReducer,
  },
});

export type stateType = ReturnType<typeof store.getState>;
