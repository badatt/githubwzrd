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
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {props.columns?.map((c, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {c.name ? c.name : c.element}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {props.rows?.map((r, ri) => (
                  <tr key={ri}>
                    {r.cells?.map((c, ci) => (
                      <td key={ci} className="px-6 py-4 whitespace-nowrap">
                        {c.element}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
