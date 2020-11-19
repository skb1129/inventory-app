import React, { useMemo, useState } from "react";

import Navbar from "./components/navbar/Navbar";
import Table from "./components/table/Table";
import { DocHeaders, DocItems, Header, Item } from "./components/table/models";
import { useAuth } from "./contexts/AuthContext";
import { useInventory } from "./contexts/InventoryContext";
import { normalise } from "./utils";
import classes from "./App.scss";

function App(): JSX.Element {
  const [filter, setFilter] = useState("");

  const { headers, items, removeItem, renderAddItem, renderEditItem } = useInventory();
  const { isAdminUser } = useAuth();

  const filteredItems: Item[] = useMemo(() => {
    if (!filter) return normalise<DocItems, Item>(items);
    const results: DocItems = {};
    for (const key in items) {
      const itemString = Object.values(items[key]).join("").toLowerCase();
      if (itemString.includes(filter.toLowerCase())) results[key] = items[key];
    }
    return normalise<DocItems, Item>(results);
  }, [items, filter]);

  return (
    <>
      <Navbar />
      <div data-testid="app" className={classes.wrapper}>
        <div className={classes.header}>
          <input
            className={classes.input}
            type="text"
            placeholder="Filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          {isAdminUser ? (
            <button className={classes.button} onClick={renderAddItem}>
              Add Item
            </button>
          ) : null}
        </div>
        <Table
          headers={normalise<DocHeaders, Header>(headers, "order")}
          items={filteredItems}
          showActions={isAdminUser}
          onRemove={removeItem}
          onEdit={renderEditItem}
        />
      </div>
    </>
  );
}

export default App;
