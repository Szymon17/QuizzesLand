import "./Create-quiz.styles.css";
import EditableQuiz from "../../components/Editable-quiz/Editable-quiz.component";
import SendCreatedQuiz from "../../components/Send-created-quiz/Send-created-quiz.component";

const CreateQuiz = () => {
  return (
    <div className="create-quiz">
      <EditableQuiz />
      <SendCreatedQuiz />
    </div>
  );
};

export default CreateQuiz;
