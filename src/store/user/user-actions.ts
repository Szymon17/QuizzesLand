import { createAsyncThunk } from "@reduxjs/toolkit";
import { singUpEmailandPassword, addUserToDb, logInWithEmailAndPassword, getUserSnapshot, getCurrentUser } from "../../utils/firebase/firebase";
import { validateNewUser } from "../../utils/functions/basic-functions";
import { userRegisterData } from "./user-types";
import { toast } from "react-toastify";

export const registerUser = async ({ email, password, confirmedPassword, displayName }: userRegisterData) => {
  const validateUserError = validateNewUser(email, password, confirmedPassword, displayName);

  if (validateUserError) {
    toast.dark(validateUserError);
    return;
  }

  try {
    const user = await singUpEmailandPassword(email, password);
    if (user) {
      addUserToDb(user, { displayName });
      toast.dark("Dodano użytkownika");
      return true;
    }
  } catch (error: any) {
    if (error.code === "auth/invalid-email") toast.dark("Podałeś błędny email");

    return false;
  }
};

export const logInEmail = createAsyncThunk("user-login-email&password", async (params: { email: string; password: string }) => {
  const { email, password } = params;

  try {
    const { user } = await logInWithEmailAndPassword(email, password);
    const userSnapshot = await getUserSnapshot(user.uid);

    toast.dark("Logowanie udane");

    return userSnapshot;
  } catch (error: any) {
    if (error.code === "auth/too-many-requests") toast.dark("Zbyt wielę prób logowań");
    else toast.dark("Podałeś błędny email lub hasło");

    throw Error(error);
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
