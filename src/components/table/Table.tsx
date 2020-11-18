import React from "react";
import classNames from "classnames";

import { Header, Item } from "./models";

import classes from "./Table.scss";
import { icons } from '../../assets'

type Props = {
  headers: Header[];
  items: Item[];
};
function Table({ headers, items }: Props): JSX.Element {
  return (
    <div className={classes.wrapper}>
      <div className={classNames(classes.row, classes.header)}>
        {headers.map((header) => (
          <span key={header.id} className={classNames(classes.column, classes[`column-${header.size}`])}>
            {header.text}
          </span>
        ))}
        <span className={classNames(classes.column, classes.columnSm)}>Actions</span>
      </div>
      <div>
        {items.map((item) => (
          <div key={item.id} className={classes.row}>
            {headers.map((header) => (
              <span
                key={`${item.id}_${header.id}`}
                className={classNames(classes.column, classes[`column-${header.size}`])}
              >
                {item[header.id]}
              </span>
            ))}
            <div className={classNames(classes.column, classes.columnSm, classes.columnActions)}>
              {icons.edit({ className: classes.icon })}
              {icons.bin({ className: classes.icon })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
