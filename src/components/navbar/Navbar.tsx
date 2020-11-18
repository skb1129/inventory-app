import React from "react";

import { useAuth } from '../../contexts/AuthContext'
import classes from "./Navbar.scss";

function Navbar(): JSX.Element {
  const { user, signIn, signOut } = useAuth();
  return (
    <div className={classes.wrapper}>
      <span className={classes.title}>Inventory App</span>
      <button onClick={user ? signOut : signIn}>{user ? "Sign Out" : "Sign In"}</button>
    </div>
  );
}

export default Navbar;
