import "./Account-dropdown.styles.css";
import { MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectDropdownOpenState } from "../../store/user-dropdown/user-dropdown-selector";
import { changeDropdownOpenState } from "../../store/user-dropdown/user-dropdown-reducer";
import { selectUser } from "../../store/user/user-selector";
import { logout } from "../../store/user/user-reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import Button from "../Button/Button.component";

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

  const userAccountAction = () => {
    navigate("account");
    dispatch(changeDropdownOpenState(false));
  };

  return (
    <>
      <div onClick={switchDropdownState} className="AccountLink">
        <FontAwesomeIcon className="userIcon" icon={faUser} />
      </div>

      <AnimatePresence mode="wait">
        {userDropdownState && (
          <motion.div
            onClick={e => e.stopPropagation()}
            className="AccountDropdown"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="AccountDropdown__userName">Witaj {user?.displayName}</h1>

            <div className="AccountDropdown__userActions">
              <Button onClick={userAccountAction}>Konto</Button>
              <Button onClick={() => dispatch(logout())}>Wyloguj</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccountDropdown;
