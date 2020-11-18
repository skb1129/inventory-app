import React, { useEffect, useState } from "react";

import { db } from "./api";
import Table from "./components/table/Table";
import { DocHeaders, DocItems, Header, Item } from "./components/table/models";
import { normalise } from "./utils";
import classes from "./App.scss";

function App(): JSX.Element {
  const [headers, setHeaders] = useState<DocHeaders>({});
  const [items, setItems] = useState<DocItems>({});

  useEffect(() => {
    const fetchHeaders = async () => {
      const refHeaders = db.collection("inventory").doc("headers");
      try {
        const docHeaders = await refHeaders.get();
        if (docHeaders.exists) {
          setHeaders(docHeaders.data() || {});
          console.log("Document data:", docHeaders.data());
        } else {
          console.log("No such document!");
        }
      } catch (e) {
        console.log("Error getting document:", e);
      }
    };
    const fetchItems = async () => {
      const refItems = db.collection("inventory").doc("items");
      try {
        const docItems = await refItems.get();
        if (docItems.exists) {
          setItems(docItems.data() || {});
          console.log("Document data:", docItems.data());
        } else {
          console.log("No such document!");
        }
      } catch (e) {
        console.log("Error getting document:", e);
      }
    };
    fetchHeaders();
    fetchItems();
  }, []);

  return (
    <div data-testid="app" className={classes.wrapper}>
      <Table headers={normalise<DocHeaders, Header>(headers)} items={normalise<DocItems, Item>(items)} />
    </div>
  );
}

export default App;
