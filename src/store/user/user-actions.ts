import { createAsyncThunk } from "@reduxjs/toolkit";
import { singUpEmailandPassword, addUserToDb, logInWithEmailAndPassword, getUserSnapshot, getCurrentUser } from "../../utils/firebase/firebase";

export const registerUser = async (email: string, password: string, displayName: string) => {
  try {
    const user = await singUpEmailandPassword(email, password);
    if (user) addUserToDb(user, { displayName });
  } catch (error) {
    throw new Error(error as any);
  }
};

export const logInEmail = createAsyncThunk("user-login-email&password", async (params: { email: string; password: string; handler?: Function }) => {
  const { email, password, handler } = params;

  try {
    const { user } = await logInWithEmailAndPassword(email, password);
    const userSnapshot = await getUserSnapshot(user.uid);
    if (handler) handler();

    return userSnapshot;
  } catch (error) {
    throw new Error(error as any);
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
