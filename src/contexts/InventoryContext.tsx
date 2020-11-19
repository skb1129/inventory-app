import React, { useContext, useEffect, useState } from "react";

import { db } from "../api";
import { DocHeaders, DocItems } from "../components/table/models";

type InventoryType = {
  headers: DocHeaders;
  items: DocItems;
};
const InventoryContext = React.createContext<InventoryType>({ headers: {}, items: {} });

const useInventory = (): InventoryType => useContext(InventoryContext);

type Props = {
  children: any;
};
function InventoryProvider({ children }: Props): JSX.Element {
  const [headers, setHeaders] = useState<DocHeaders>({});
  const [items, setItems] = useState<DocItems>({});

  useEffect(() => {
    const fetchHeaders = async () => {
      const refHeaders = db.collection("inventory").doc("headers");
      try {
        const docHeaders = await refHeaders.get();
        if (docHeaders.exists) {
          setHeaders(docHeaders.data() || {});
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

  return <InventoryContext.Provider value={{ headers, items }}>{children}</InventoryContext.Provider>;
}

export { useInventory, InventoryProvider };
