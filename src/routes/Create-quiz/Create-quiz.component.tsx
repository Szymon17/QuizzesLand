import "./Create-quiz.styles.css";
import { useEffect } from "react";
import EditableQuiz from "../../components/Editable-quiz/Editable-quiz.component";
import SendCreatedQuiz from "../../components/Send-created-quiz/Send-created-quiz.component";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user-selector";
import { useNavigate } from "react-router";

const CreateQuiz = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  return (
    <div className="create-quiz">
      <EditableQuiz />
      <SendCreatedQuiz />
    </div>
  );
};

export default CreateQuiz;
