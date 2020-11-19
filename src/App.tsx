import React from "react";

import Navbar from "./components/navbar/Navbar";
import Table from "./components/table/Table";
import { DocHeaders, DocItems, Header, Item } from "./components/table/models";
import { useAuth } from "./contexts/AuthContext";
import { useInventory } from "./contexts/InventoryContext";
import { normalise } from "./utils";
import classes from "./App.scss";

function App(): JSX.Element {
  const { headers, items, removeItem } = useInventory();
  const { isAdminUser } = useAuth();

  return (
    <>
      <Navbar />
      <div data-testid="app" className={classes.wrapper}>
        <Table
          headers={normalise<DocHeaders, Header>(headers, "order")}
          items={normalise<DocItems, Item>(items)}
          showActions={isAdminUser}
          onRemove={removeItem}
        />
      </div>
    </>
  );
}

export default App;
