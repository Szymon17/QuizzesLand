import "./Navigation.styles.css";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user-selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { selectAlertText, selectAlertTime } from "../../store/alert/alert-selectors";
import { hideAlert, setAlert } from "../../store/alert/alert-reducer";
import AccountDropdown from "../../components/Account-dropdown/Account-dropdown.component";
import CustomAlert from "../../components/CustomAlert/CustomAlert.component";
import CustomLink from "../../components/CustomLink/CustomLink.component";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const alertText = useAppSelector(selectAlertText);
  const alertVisibleTime = useAppSelector(selectAlertTime);
  const [alertIndex, setAlertIndex] = useState<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const removeAlert = () => {
      dispatch(hideAlert());
      setAlertIndex(undefined);
    };

    if (alertText.length > 1) {
      const index = setTimeout(removeAlert, alertVisibleTime);

      if (alertIndex) {
        clearTimeout(alertIndex);
        removeAlert();
        dispatch(setAlert(alertText));
      }

      setAlertIndex(index);
    }
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
      {alertText.length > 0 && <CustomAlert />}
      <Outlet />
    </>
  );
};

export default Navigation;
