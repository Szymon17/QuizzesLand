import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyCuU_4O5uiC2ue8UZWCqeFktaN6U08iq2g",
  authDomain: "quizzes-fd7e1.firebaseapp.com",
  projectId: "quizzes-fd7e1",
  storageBucket: "quizzes-fd7e1.appspot.com",
  messagingSenderId: "412322295241",
  appId: "1:412322295241:web:2d920a9c60dc1904bc8c18",
};

const app = initializeApp(firebaseConfig);

export const uploadImageToStorage = (imageToUpload: File) => {
  if (imageToUpload === undefined) return;
  if (imageToUpload && imageToUpload.size < 30710) {
    console.log(imageToUpload);
    const imageRef = ref(firebaseStorage, `images/${imageToUpload.name + v4()}`);
    // uploadBytes(imageRef, imageToUpload).then(() => alert("dodano zdjęcie")); Uplouduje do storage
  } else alert("Zdjęcie nie może mieć więcej niż 30 kb");
};

export const firebaseStorage = getStorage(app);
