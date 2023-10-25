import "./Create-quiz.styles.css";
import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user-selector";
import { useNavigate } from "react-router";

import EditableQuiz from "../../components/Editable-quiz/Editable-quiz.component";
import SendCreatedQuiz from "../../components/Send-created-quiz/Send-created-quiz.component";

const CreateQuiz = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  return (
    <div className="createQuiz">
      <EditableQuiz>
        <SendCreatedQuiz />
      </EditableQuiz>
    </div>
  );
};

export default CreateQuiz;
