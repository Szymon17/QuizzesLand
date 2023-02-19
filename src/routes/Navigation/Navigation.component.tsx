import "./Navigation.styles.css";
import { Outlet, Link } from "react-router-dom";
import SearchBox from "../../components/Search-box/Search-box.component";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user-selector";
import AccountPanel from "../../components/Account-panel/Account-panel.component";

const Navigation = () => {
  const user = useAppSelector(selectUser);

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
          {user === null ? (
            <Link className="Navigation-link" to="/sing-in">
              Login
            </Link>
          ) : (
            <AccountPanel />
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
