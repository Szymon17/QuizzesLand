import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./routes/Navigation/Navigation.component";
import HomePage from "./routes/Home-page/Home-page.component";
import QuizPage from "./routes/Quiz-page/Quiz-page.component";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomePage />} />
          <Route path="/quiz/*" element={<QuizPage />} />
          <Route path="/login" element={<span>LogIn</span>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
