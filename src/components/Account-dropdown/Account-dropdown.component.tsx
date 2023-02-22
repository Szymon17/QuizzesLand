import "./Account-dropdown.styles.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user-selector";
import { logout } from "../../store/user/user-reducer";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button/Button.component";

const AccountDropdown = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [accountDropdownIsOpen, setAccountDropdownState] = useState(false);

  return (
    <>
      <div onClick={() => setAccountDropdownState(!accountDropdownIsOpen)} className="Account-link">
        Acc
      </div>

      <AnimatePresence mode="wait">
        {accountDropdownIsOpen && (
          <motion.div className="Account-dropdown" initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
            <h1 className="user-name">{user?.displayName}</h1>
            <ul className="user-actions">
              <li>
                <Link to="account">Moje konto</Link>
              </li>
            </ul>
            <Button onClick={() => dispatch(logout())}>logout</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccountDropdown;
