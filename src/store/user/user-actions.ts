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

export const logInEmail = createAsyncThunk("user-login-email&password", async (userData: { email: string; password: string }) => {
  const { email, password } = userData;

  try {
    const { user } = await logInWithEmailAndPassword(email, password);
    const userSnapshot = await getUserSnapshot(user.uid);

    return userSnapshot;
  } catch (error) {
    throw new Error(error as any);
  }
});

export const checkUserSession = createAsyncThunk("user-check-session", async () => {
  const user = await getCurrentUser();

  if (!user) return;

  try {
    const userSnapshot = getUserSnapshot(user.uid);
    return userSnapshot;
  } catch (error) {
    throw new Error(error as any);
  }
});
