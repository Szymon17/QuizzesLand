import "./Account-panel.styles.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user/user-selector";
import { logout } from "../../store/user/user-reducer";

const AccountPanel = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [accountPanelIsOpen, setAccountPanelState] = useState(false);

  return (
    <>
      <div onClick={() => setAccountPanelState(!accountPanelIsOpen)} className="Account-link">
        Acc
      </div>

      {accountPanelIsOpen && (
        <div className="Account-panel">
          <h1 className="user-name">{user?.displayName}</h1>
          <ul className="user-actions">
            <li>
              <Link to="account">Moje konto</Link>
            </li>
          </ul>
          <span onClick={() => dispatch(logout())} className="logout">
            logout
          </span>
        </div>
      )}
    </>
  );
};

export default AccountPanel;
