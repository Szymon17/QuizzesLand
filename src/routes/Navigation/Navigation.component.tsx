import "./Navigation.styles.css";
import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user-selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { selectAlertText } from "../../store/alert/alert-selectors";
import { hideAlert } from "../../store/alert/alert-reducer";
import { AnimatePresence } from "framer-motion";
import SearchBox from "../../components/Search-box/Search-box.component";
import AccountDropdown from "../../components/Account-dropdown/Account-dropdown.component";
import CustomAlert from "../../components/CustomAlert/CustomAlert.component";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const alertText = useAppSelector(selectAlertText);

  useEffect(() => {
    if (alertText.length > 1) setTimeout(() => dispatch(hideAlert()), 5000);
  }, [alertText]);

  const searchInDatabase = (): void => {
    console.log("search");
  };

  console.log("render");
  console.log(alertText, "alert");

  return (
    <>
      <div className="Navigation">
        <Link className="main-page-link" to="/">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
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
            <AccountDropdown />
          )}
        </div>
      </div>
      <Outlet />
      {alertText.length > 0 && (
        <AnimatePresence>
          <CustomAlert />
        </AnimatePresence>
      )}
    </>
  );
};

export default Navigation;
