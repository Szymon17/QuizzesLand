import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateTypes = {
  text: string;
  visibleTime: number;
};

const initialState: InitialStateTypes = {
  text: "",
  visibleTime: 5000,
};

const alertSlice = createSlice({
  name: "alertSlice",
  initialState: initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.text = payload;
    },

    hideAlert: state => {
      state.text = "";
    },
  },
});

export const { setAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
