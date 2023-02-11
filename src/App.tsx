import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./routes/Navigation/Navigation.component";
import HomePage from "./routes/Home-page/Home-page.component";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/login" element={<span>LogIn</span>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
