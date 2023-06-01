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
import AccountDropdown from "../../components/Account-dropdown/Account-dropdown.component";
import CustomAlert from "../../components/CustomAlert/CustomAlert.component";
import CustomLink from "../../components/CustomLink/CustomLink.component";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const alertText = useAppSelector(selectAlertText);

  useEffect(() => {
    if (alertText.length > 1) setTimeout(() => dispatch(hideAlert()), 5000);
  }, [alertText]);

  return (
    <>
      <div className="Navigation">
        <CustomLink cssClass="main-page-link" to="/">
          <FontAwesomeIcon icon={faHouse} />
        </CustomLink>
        <div className="Navigation-container">
          <div className="Navigation-link">
            <CustomLink to="/quizzes">Quizy</CustomLink>
          </div>
          {user === null ? (
            <div className="Navigation-link">
              <CustomLink to="/sing-in">Login</CustomLink>
            </div>
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
