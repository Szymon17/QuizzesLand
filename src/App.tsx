import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./routes/Navigation/Navigation.component";
import HomePage from "./routes/Home-page/Home-page.component";
import QuizPage from "./routes/Quiz-page/Quiz-page.component";
import SingIn from "./routes/Sing-in/Sing-in.component";
import SingUp from "./components/Sing-up/Sing-up.component";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomePage />} />
          <Route path="/quiz/*" element={<QuizPage />} />
          <Route path="/sing-in" element={<SingIn />} />
          <Route path="/sing-up" element={<SingUp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
