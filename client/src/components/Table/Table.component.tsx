import React from 'react';
import classes from './Table.module.css';

export interface IColumn {
  name?: string;
  element?: JSX.Element;
}

export interface ICell {
  element?: JSX.Element;
}

export interface IRow {
  cells?: ICell[];
}

export interface ITableData {
  columns?: IColumn[];
  rows?: IRow[];
}

const Table = (props: ITableData): JSX.Element => {
  return (
    <section className={classes['main']}>
      <table className={classes['table-wrapper']}>
        <thead className={classes['table-head-wrapper']}>
          <tr>
            {props.columns?.map((c, i) => (
              <th key={i} scope="col" className={classes['table-col']}>
                {c.name ? c.name : c.element}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={classes['table-body-wrapper']}>
          {props.rows?.map((r, ri) => (
            <tr key={ri}>
              {r.cells?.map((c, ci) => (
                <td key={ci} className={classes['table-cell']}>
                  {c.element}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
