import React, { Fragment } from 'react';
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
  loading?: boolean;
  hideHeader?: boolean;
}

type Props = IElementProps & ITableData;

const Tbody = (props: { rows?: IRow[]; columns?: IColumn[] }) => {
  const { rows } = props;
  return (
    <Fragment>
      {rows?.map((r, ri) => (
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
      ))}
    </Fragment>
  );
};

const LoadingTbody = () => {
  return (
    <tr className={cl.tr}>
      <td className={cl.td} style={{ width: `100%` }}>
        <Loader />
      </td>
    </tr>
  );
};

const EmptyTbody = () => {
  return (
    <tr className={cl.tr}>
      <td className={cl.td} style={{ width: `100%` }}>
        No data found
      </td>
    </tr>
  );
};

export const Table = (props: Props): JSX.Element => {
  const { columns, rows, loading, hideHeader } = props;
  const doesRowsExist = rows && rows.length > 0;
  return (
    <table component-name="Table" className={clsx(cl.table, props.className)}>
      {!hideHeader && (
        <thead className={cl.thead}>
          <tr className={cl.tr}>
            {columns?.map((c, i) => (
              <th key={i} scope="col" className={cl.th} style={{ width: `${c.width}%` }}>
                {c.name ? c.name : c.element}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody className={cl.tbody}>
        {loading && <LoadingTbody />}
        {!loading && (doesRowsExist ? <Tbody rows={rows} columns={columns} /> : <EmptyTbody />)}
      </tbody>
    </table>
  );
};

Table.defaultProps = {
  hideHeader: false,
};
