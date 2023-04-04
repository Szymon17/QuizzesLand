import { createAsyncThunk } from "@reduxjs/toolkit";
import { singUpEmailandPassword, addUserToDb, logInWithEmailAndPassword, getUserSnapshot, getCurrentUser } from "../../utils/firebase/firebase";
import { setAlert } from "../alert/alert-reducer";

export const registerUser = async (email: string, password: string, confirmedPassword: string, displayName: string, dispatch?: Function) => {
  if (dispatch) {
    if (email === "") dispatch(setAlert("Nie podałeś emailu"));
    else if (displayName === "") dispatch(setAlert("Nie podałeś nazwy użytkownika"));
    else if (password === "") dispatch(setAlert("Nie podałeś hasła"));
    else if (password !== confirmedPassword) dispatch(setAlert("Hasła nie są takie same"));
  }

  try {
    const user = await singUpEmailandPassword(email, password);
    if (user) {
      addUserToDb(user, { displayName });
      if (dispatch) dispatch(setAlert("Dodano użytkownika"));
      return true;
    }
  } catch (error: any) {
    if (dispatch) {
      if (error.code === "auth/invalid-email") dispatch(setAlert("Podałeś błędny email"));
    }

    return false;
  }
};

export const logInEmail = createAsyncThunk("user-login-email&password", async (params: { email: string; password: string; dispatch?: Function }) => {
  const { email, password, dispatch } = params;

  try {
    const { user } = await logInWithEmailAndPassword(email, password);
    const userSnapshot = await getUserSnapshot(user.uid);
    if (dispatch) dispatch(setAlert("Logowanie udane"));

    return userSnapshot;
  } catch (error: any) {
    if (dispatch) {
      if (error.code === "auth/wrong-password") dispatch(setAlert("Podałeś błędny email lub hasło"));
      if (error.code === "auth/too-many-requests") dispatch(setAlert("Zbyt wielę prób logowań"));
    }
  }
});

export const checkUserSession = createAsyncThunk("user-check-session", async () => {
  const user = await getCurrentUser();

  if (user === null) return null;

  try {
    const userSnapshot = getUserSnapshot(user.uid);
    return userSnapshot;
  } catch (error) {
    throw new Error(error as any);
  }
});
