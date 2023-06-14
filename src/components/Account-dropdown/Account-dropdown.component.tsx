import "./Account-dropdown.styles.css";
import { MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user-selector";
import { logout } from "../../store/user/user-reducer";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { selectDropdownOpenState } from "../../store/user-dropdown/user-dropdown-selector";
import Button from "../Button/Button.component";
import { changeDropdownOpenState } from "../../store/user-dropdown/user-dropdown-reducer";

const AccountDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const userDropdownState = useAppSelector(selectDropdownOpenState);

  const switchDropdownState = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(changeDropdownOpenState(!userDropdownState));
  };

  const userLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <div onClick={switchDropdownState} className="Account-link">
        <FontAwesomeIcon className="user-icon" icon={faUser} />
      </div>

      <AnimatePresence mode="wait">
        {userDropdownState && (
          <motion.div
            onClick={e => e.stopPropagation()}
            className="Account-dropdown"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="user-name">{user?.displayName}</h1>
            <ul className="user-actions">
              <li>
                <Link onClick={() => dispatch(changeDropdownOpenState(false))} to="account">
                  Moje konto
                </Link>
              </li>
            </ul>
            <Button onClick={userLogOut}>Wyloguj</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccountDropdown;
