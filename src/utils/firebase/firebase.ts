import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, orderBy, query, limit, getDocs, updateDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getAuth, User, onAuthStateChanged } from "firebase/auth";
import { quizzType } from "../../store/quizzes/quizz-types";
import { userSnapshotType } from "../../store/user/user-types";
import { v4 } from "uuid";

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

export const validateQuiz = (Quizz: quizzType) => {
  if (Quizz.answers.length > 1 && Quizz.title) return true;
  else if (Quizz.answers.length <= 1) throw Error("You need add more answers");
  else if (!Quizz.title) throw Error("You forgot about title");
  else if (!Quizz.author || Quizz.authorUID) throw Error("Something is wrong with your loggin session");
  else if (!Quizz.uid) throw Error("something went wrong");
};

export const addQuizToDB = (Quizz: quizzType) => {
  if (validateQuiz(Quizz)) {
    const regex = /\w+/g;

    const colectionRef = collection(db, `quizzes/${v4().match(regex)?.join("")}`);
    console.log(Quizz);
    try {
      addDoc(colectionRef, Quizz).then(() => alert("dodano"));
    } catch (error) {
      throw Error(error as any);
    }
  }
};

export const getQuiz = async (uid: string): Promise<quizzType | void> => {
  const docRef = doc(db, "quizzes", uid);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) return docSnapshot.data() as quizzType;
};

export const getRandomQuiz = async (numberOfdocs: number): Promise<quizzType[] | void> => {
  if (numberOfdocs <= 10) {
    const collectionQuizzes = collection(db, "quizzes");
    const q = query(collectionQuizzes, orderBy("title"), limit(numberOfdocs));
    const quizSnapshot = await getDocs(q);

    if (quizSnapshot) return quizSnapshot.docs.map(snapshot => snapshot.data()) as quizzType[];
  } else throw new Error("max docs to fetch is a 10");
};

export const updateLikes = async (quizz: quizzType) => {
  const docRef = doc(db, "quizzes", quizz.uid);

  await updateDoc(docRef, {
    likes: quizz.likes + 1,
  });
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
