import { createSelector } from "@reduxjs/toolkit";
import { stateType } from "../store";

const selectDropdownReducer = (state: stateType) => state.userDropdown;

export const selectDropdownOpenState = createSelector([selectDropdownReducer], state => state.isOpen);
