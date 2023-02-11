import "./Navigation.styles.css";
import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { getRandomQuiz } from "../../utils/firebase/firebase";
import SearchBox from "../../components/Search-box/Search-box.component";

const Navigation = () => {
  const searchInDatabase = (): void => {
    console.log("search");
  };

  useEffect(() => {
    const displayQuizzes = async () => {
      // const quizzes = await getRandomQuiz(); działa fetch, reducer dorobić do wyświetlania i zastanowić się nad perstist dla oszczędzenia zasobów
      console.log("quizzes");
    };

    displayQuizzes();
  }, []);

  return (
    <>
      <div className="Navigation">
        <div className="Navigation-container">
          <div className="Navigation-search-box-container">
            <SearchBox onChangeHandler={searchInDatabase} />
          </div>
          <Link className="Navigation-link" to="/quizzes">
            Quizy
          </Link>
          <Link className="Navigation-link" to="/login">
            Login
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
