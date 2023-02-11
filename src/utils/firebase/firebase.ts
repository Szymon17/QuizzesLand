import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getFirestore, orderBy, query, limit, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_SECRET_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

type answerType = {
  [key: number]:
    | {
        text: string;
        correct: boolean;
      }
    | undefined;
};

export type quizzType = {
  title: string;
  author: string;
  authorUID: string;
  description: string;
  answers: answerType[];
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const validateQuiz = (Quizz: quizzType) => {
  if (Quizz.answers.length > 1 && Quizz.title) return true;
  else if (Quizz.answers.length <= 1) throw Error("You need add more answers");
  else if (!Quizz.title) throw Error("You forgot about title");
  else if (!Quizz.author || Quizz.authorUID) throw Error("Something is wrong with your loggin session");
};

export const addQuizToDB = (Quizz: quizzType) => {
  if (validateQuiz(Quizz)) {
    const colectionRef = collection(db, `quizzes`);
    console.log(Quizz);
    try {
      addDoc(colectionRef, Quizz).then(() => alert("dodano"));
    } catch (error) {
      throw Error(error as any);
    }
  }
};

export const getRandomQuiz = async () => {
  const collectionQuizzes = collection(db, "quizzes");
  const q = query(collectionQuizzes, orderBy("title"), limit(4));
  const quizSnapshot = await getDocs(q);

  if (quizSnapshot) return quizSnapshot.docs.map(snapshot => snapshot.data());
};
