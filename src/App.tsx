import React from "react";

import Navbar from "./components/navbar/Navbar";
import Table from "./components/table/Table";
import { DocHeaders, DocItems, Header, Item } from "./components/table/models";
import { useInventory } from "./contexts/InventoryContext";
import { normalise } from "./utils";
import classes from "./App.scss";

function App(): JSX.Element {
  const { headers, items } = useInventory();

  return (
    <>
      <Navbar />
      <div data-testid="app" className={classes.wrapper}>
        <Table headers={normalise<DocHeaders, Header>(headers, "order")} items={normalise<DocItems, Item>(items)} />
      </div>
    </>
  );
}

export default App;
