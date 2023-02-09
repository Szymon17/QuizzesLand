import { createSlice } from "@reduxjs/toolkit";
import { stateType } from "./store";

const testSlice = createSlice({
  name: "testSlice",
  initialState: {
    value: 0,
  },
  reducers: {
    incremented: state => {
      state.value += 1;
    },

    decremented: state => {
      state.value -= 1;
    },
  },
});

export const { incremented, decremented } = testSlice.actions;
export const selectCount = (state: stateType) => state.test.value;

export default testSlice.reducer;
