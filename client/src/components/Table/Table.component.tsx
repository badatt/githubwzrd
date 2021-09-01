import React from 'react';
import clsx from 'clsx';
import { IElementProps } from 'types';
import classes from './Table.module.css';

export interface IColumn {
  name?: string;
  element?: JSX.Element;
  width?: number;
}

export interface ICell {
  element?: JSX.Element | string | number | boolean;
}

export interface IRow {
  cells?: ICell[];
}

export interface ITableData {
  columns?: IColumn[];
  rows?: IRow[];
}

type Props = IElementProps & ITableData;

const Table = (props: Props): JSX.Element => {
  return (
    <table component-name="Table" className={clsx(classes['table'], props.className)}>
      <thead className={classes['thead']}>
        <tr className={classes['tr']}>
          {props.columns?.map((c, i) => (
            <th key={i} scope="col" className={classes['th']} style={{ width: `${c.width}%` }}>
              {c.name ? c.name : c.element}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={classes['tbody']}>
        {props.rows?.map((r, ri) => (
          <tr key={ri} className={classes['tr']}>
            {r.cells?.map((c, ci) => (
              <td
                key={ci}
                className={classes['td']}
                style={{ width: `${props.columns && props.columns[ci].width}%` }}
              >
                {c.element}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
