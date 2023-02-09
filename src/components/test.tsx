import { ChangeEvent, useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { firebaseStorage, uploadImageToStorage } from "../utils/firebase/firebase";

const Test = () => {
  const [imageUpload, setImage] = useState({} as File);
  const [imageToDispaly, setImageToDisplay] = useState("");

  const fileUploadHandelr = () => {
    if (imageUpload.name) uploadImageToStorage(imageUpload);
  };

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files;
    if (fileList && fileList[0]) setImage(fileList[0]);
  };

  useEffect(() => {
    const imageRef = ref(firebaseStorage, `main/mainPage.png`);
    getDownloadURL(imageRef).then(imageUrl => setImageToDisplay(imageUrl));
  }, []);

  return (
    <div>
      <input type="file" onChange={changeEventHandler} />
      <button onClick={fileUploadHandelr}>Upload</button>
      <div>{imageToDispaly ? <img width="300px" height="200px" src={imageToDispaly} alt="" /> : <p>nothing to display</p>}</div>
    </div>
  );
};

export default Test;
