import React from 'react';
import clsx from 'clsx';
import { IElementProps } from 'types';
import Loader from 'components/Loader/Loader.component';
import cl from './Table.module.scss';

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

export const Table = (props: Props): JSX.Element => {
  const { columns, rows } = props;
  const doesRowsExist = rows && rows.length > 0;
  return (
    <table component-name="Table" className={clsx(cl.table, props.className)}>
      <thead className={cl.thead}>
        <tr className={cl.tr}>
          {columns?.map((c, i) => (
            <th key={i} scope="col" className={cl.th} style={{ width: `${c.width}%` }}>
              {c.name ? c.name : c.element}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={cl.tbody}>
        {doesRowsExist ? (
          rows?.map((r, ri) => (
            <tr key={ri} className={cl.tr}>
              {r.cells?.map((c, ci) => (
                <td
                  key={ci}
                  className={cl.td}
                  style={{ width: `${props.columns && props.columns[ci].width}%` }}
                >
                  {c.element}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr className={cl.tr}>
            <td className={cl.td} style={{ width: `100%` }}>
              <Loader />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
