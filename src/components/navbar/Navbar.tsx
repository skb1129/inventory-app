import React from "react";

import { useAuth } from "../../contexts/AuthContext";
import classes from "./Navbar.scss";

function Navbar(): JSX.Element {
  const { user, signIn, signOut } = useAuth();
  return (
    <div className={classes.wrapper}>
      <span className={classes.title}>Inventory App</span>
      <div>
        {user ? <span className={classes.name}>{user.displayName}</span> : null}
        <button className={classes.button} onClick={user ? signOut : signIn}>
          {user ? "SIGN OUT" : "SIGN IN"}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
