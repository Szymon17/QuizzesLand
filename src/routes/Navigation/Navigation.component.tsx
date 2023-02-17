import "./Navigation.styles.css";
import { Outlet, Link } from "react-router-dom";
import SearchBox from "../../components/Search-box/Search-box.component";

const Navigation = () => {
  const searchInDatabase = (): void => {
    console.log("search");
  };

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
          <Link className="Navigation-link" to="/sing-in">
            Login
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
