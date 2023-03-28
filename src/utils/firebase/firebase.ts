import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  orderBy,
  query,
  limit,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  where,
  getCountFromServer,
  deleteDoc,
} from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getAuth, User, onAuthStateChanged } from "firebase/auth";
import { quizzType, updateQuizParams } from "../../store/quizzes/quizz-types";
import { userQuizSnapshot, userSnapshotType } from "../../store/user/user-types";
import { validateQuiz } from "../functions/basic-functions";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_SECRET_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const addQuizToDB = async (Quizz: quizzType) => {
  const tryValidateQuiz = validateQuiz(Quizz);

  if (typeof tryValidateQuiz === "boolean" && tryValidateQuiz === true) {
    const colectionRef = doc(db, `quizzes/${Quizz.uid}`);

    try {
      await setDoc(colectionRef, Quizz).then(() => alert("dodano"));
    } catch (error) {
      throw Error(error as any);
    }
  } else console.error(tryValidateQuiz);
};

export const getQuiz = async (uid: string): Promise<quizzType | void> => {
  const docRef = doc(db, "quizzes", uid);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) return docSnapshot.data() as quizzType;
};

export const getQuizzesByIndex = async (numberOfdocs: number, fromIndexCount: number = Infinity): Promise<quizzType[] | void> => {
  if (numberOfdocs <= 10) {
    const collectionQuizzes = collection(db, "quizzes");
    const q = query(collectionQuizzes, orderBy("index", "desc"), where("index", "<", fromIndexCount), limit(numberOfdocs));

    try {
      const quizSnapshot = await getDocs(q);
      console.log(
        quizSnapshot.docs.map(snapshot => snapshot.data()),
        "getQuizzesByLikes"
      );
      if (quizSnapshot) return quizSnapshot.docs.map(snapshot => snapshot.data()) as quizzType[];
    } catch (error) {
      throw Error(error as any);
    }
  } else throw new Error("max docs to fetch is a 10");
};

export const logInWithEmailAndPassword = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
export const logOut = () => signOut(auth);

export const singUpEmailandPassword = async (email: string, password: string): Promise<User | void> => {
  if (!email || !password) return;

  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  return user;
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      userAuth => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

export const addUserToDb = async (user: User, aditionalInformations: { displayName?: string } | void): Promise<void> => {
  const docSnapshot = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(docSnapshot);

  const { displayName, email, uid } = user;

  if (!userSnapshot.exists()) {
    try {
      await setDoc(docSnapshot, { displayName, email, id: uid, solvedQuizzes: [], userQuizzes: [], ...aditionalInformations });
    } catch (error) {
      throw new Error(error as any);
    }
  }
};

export const getUserSnapshot = async (uid: string): Promise<userSnapshotType | void> => {
  const docSnapshot = doc(db, "users", uid);
  const userSnapshot = await getDoc(docSnapshot);

  if (userSnapshot) return userSnapshot.data() as userSnapshotType;
};

export const updateLikesDB = async (quiz: quizzType) => {
  const docRef = doc(db, "quizzes", quiz.uid);

  await updateDoc(docRef, {
    likes: quiz.likes + 1,
  });
};

export const updateUserSolvedQuizzes = async (quizUid: string, user: userSnapshotType) => {
  const docRef = doc(db, "users", user.id);

  const result = [...user.solvedQuizzes];
  result.push(quizUid);

  await updateDoc(docRef, {
    solvedQuizzes: result,
  });
};

export const updateUserQuizzes = async (quizSnapshot: { uid: string; title: string }, user: userSnapshotType) => {
  const docSnapshot = doc(db, "users", user.id);

  const result = [...user.userQuizzes];
  result.push(quizSnapshot);

  updateDoc(docSnapshot, {
    userQuizzes: result,
  });
};

export const updateQuiz = async (params: updateQuizParams, uid: string, handler?: Function) => {
  const docSnapshot = doc(db, "quizzes", uid);

  await updateDoc(docSnapshot, {
    title: params.title,
    description: params.description,
    questions: params.questions,
  });

  if (handler) handler();
};

export const updateUserSnapshotQuiz = (title: string, quizUid: string, user: userSnapshotType) => {
  const docSnapshot = doc(db, "users", user.id);

  const userQuizzes: userQuizSnapshot[] = [];

  user.userQuizzes.forEach(quiz => {
    userQuizzes.push({ ...quiz });
  });

  const quizIndex = userQuizzes.findIndex(quizSnapshot => quizSnapshot.uid === quizUid);
  userQuizzes[quizIndex].title = title;

  updateDoc(docSnapshot, {
    userQuizzes: userQuizzes,
  });
};

export const getDocumentsCount = async (path: string) => {
  const colectionRef = collection(db, path);
  const snapshot = await getCountFromServer(colectionRef);

  return snapshot.data().count;
};

export const deleteQuiz = async (quizUid: string) => {
  const docRef = doc(db, "quizzes", quizUid);

  await deleteDoc(docRef);
};

export const deleteUserQuiz = async (quizUid: string, user: userSnapshotType) => {
  const docSnapshot = doc(db, "users", user.id);
  const userQuizzes: userQuizSnapshot[] = [];

  user.userQuizzes.forEach(quiz => {
    if (quiz.uid !== quizUid) userQuizzes.push({ ...quiz });
  });

  await updateDoc(docSnapshot, {
    userQuizzes: userQuizzes,
  });
};

export const addNewQuizToDb = async (user: userSnapshotType, quiz: quizzType, handler?: Function) => {
  await addQuizToDB(quiz);
  await updateUserQuizzes({ uid: quiz.uid, title: quiz.title }, user);
  if (handler) handler();
};

export const deleteQuizFromDb = async (quizUid: string, user: userSnapshotType, handler?: Function) => {
  await deleteQuiz(quizUid);
  await deleteUserQuiz(quizUid, user);
  if (handler) handler();
};
