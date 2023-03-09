import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateTypes = {
  isOpen: boolean;
};

const initialState: initialStateTypes = {
  isOpen: false,
};

const userDropdownSlice = createSlice({
  name: "user-dropdown-slice",
  initialState: initialState,
  reducers: {
    changeDropdownOpenState: (state, action: PayloadAction<boolean>) => {
      const { payload } = action;

      state.isOpen = payload;
    },
  },
});

export const { changeDropdownOpenState } = userDropdownSlice.actions;

export default userDropdownSlice.reducer;
