import "./Navigation.styles.css";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user-selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import AccountDropdown from "../../components/Account-dropdown/Account-dropdown.component";
import CustomLink from "../../components/CustomLink/CustomLink.component";

const Navigation = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <div className="Navigation">
        <CustomLink cssClass="main-page-link" to="/">
          <FontAwesomeIcon icon={faHouse} />
        </CustomLink>
        <div className="Navigation__container">
          <div className="Navigation__link">
            <CustomLink to="/">Quizy</CustomLink>
          </div>
          {user === null ? (
            <div className="Navigation__logIn-links">
              <div className="Navigation-link">
                <CustomLink to="/sing-in">Zaloguj się</CustomLink>
              </div>
              <div className="Navigation__link-blue">
                <CustomLink to="/sing-up">Zarejstuj się</CustomLink>
              </div>
            </div>
          ) : (
            <AccountDropdown />
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
