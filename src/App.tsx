import React from "react";

import classes from "./App.scss";

function App(): JSX.Element {
  return (
    <div data-testid="app" className={classes.wrapper}>
      <header className={classes.header}>
        <img src="/react.png" className={classes.logo} alt="React logo." />
        <p className={classes.text}>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className={classes.link} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
