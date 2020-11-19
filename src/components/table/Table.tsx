import React from "react";
import classNames from "classnames";

import { icons } from "../../assets";
import { Header, Item } from "./models";
import classes from "./Table.scss";

type Props = {
  headers: Header[];
  items: Item[];
  showActions?: boolean;
  onRemove?: (id: string) => Promise<void>;
  onEdit?: (item: Item) => void;
};
function Table({ headers, items, showActions, onRemove, onEdit }: Props): JSX.Element {
  const renderItem = (item: Item) => {
    const deleteItem = () => onRemove && onRemove(item.id);
    const editItem = () => onEdit && onEdit(item);
    return (
      <div key={item.id} className={classes.row}>
        {headers.map((header) => (
          <span
            key={`${item.id}_${header.id}`}
            className={classNames(classes.column, classes[`column-${header.size}`])}
          >
            {item[header.id]}
          </span>
        ))}
        {showActions ? (
          <div className={classNames(classes.column, classes.columnSm, classes.columnActions)}>
            {icons.edit({ className: classes.icon, onClick: editItem })}
            {icons.bin({ className: classes.icon, onClick: deleteItem })}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className={classes.wrapper}>
      <div className={classNames(classes.row, classes.header)}>
        {headers.map((header) => (
          <span key={header.id} className={classNames(classes.column, classes[`column-${header.size}`])}>
            {header.text}
          </span>
        ))}
        {showActions ? <span className={classNames(classes.column, classes.columnSm)}>Actions</span> : null}
      </div>
      <div>{items.map(renderItem)}</div>
    </div>
  );
}

export default Table;
