import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { checkUserSession } from "./store/user/user-actions";
import { changeDropdownOpenState } from "./store/user-dropdown/user-dropdown-reducer";
import { useAppDispatch } from "./store/hooks";
import Navigation from "./routes/Navigation/Navigation.component";
import HomePage from "./routes/Home-page/Home-page.component";
import QuizPage from "./routes/Quiz-page/Quiz-page.component";
import SingIn from "./routes/Sing-in/Sing-in.component";
import SingUp from "./components/Sing-up/Sing-up.component";
import AccountPanel from "./routes/Account-panel/Account-panel.component";
import CreateQuiz from "./routes/Create-quiz/Create-quiz.component";
import Quizzes from "./routes/Quizzes/Quizzes.component";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div className="App" onClick={() => dispatch(changeDropdownOpenState(false))}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomePage />} />
          <Route path="/quiz/*" element={<QuizPage />} />
          <Route path="/sing-in" element={<SingIn />} />
          <Route path="/sing-up" element={<SingUp />} />
          <Route path="/account" element={<AccountPanel />} />
          <Route path="/account/create-quiz" element={<CreateQuiz />} />
          <Route path="/quizzes" element={<Quizzes />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
