import { ChangeEvent, useEffect, useState } from "react";

const Test = () => {
  const [imageUpload, setImage] = useState({} as File);
  const [imageToDispaly, setImageToDisplay] = useState("");

  const addQuizz = () => {
    const quiz = {
      title: "Js",
    };
  };

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files;
    if (fileList && fileList[0]) setImage(fileList[0]);
  };

  return (
    <div>
      <input type="file" onChange={changeEventHandler} />
      <button onClick={addQuizz}>Upload</button>
    </div>
  );
};

export default Test;
