import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { useShallowEqualSelector } from 'modules/hooks';

import { getRepos } from 'actions/settings.action';

import { Paper, Table } from 'components';
import { ITableData } from 'components/Table/Table.component';

const columns = [
  {
    name: 'Name',
  },
  {
    name: 'Title',
  },
  {
    name: 'Status',
  },
  {
    name: 'Role',
  },
  {
    name: 'Edit',
  },
];
const rows = [
  {
    cells: [
      {
        element: (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium">Jane Cooper</div>
              <div className="text-sm ">jane.cooper@example.com</div>
            </div>
          </div>
        ),
      },
      {
        element: (
          <Fragment>
            <div className="text-sm ">Regional Paradigm Technician</div>
            <div className="text-sm ">Optimization</div>
          </Fragment>
        ),
      },
      {
        element: (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Active
          </span>
        ),
      },
      {
        element: <span>Admin</span>,
      },
      {
        element: (
          <a href="#" className="text-indigo-600 hover:text-indigo-900">
            Edit
          </a>
        ),
      },
    ],
  },
  {
    cells: [
      {
        element: (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium">Jane Cooper</div>
              <div className="text-sm ">jane.cooper@example.com</div>
            </div>
          </div>
        ),
      },
      {
        element: (
          <Fragment>
            <div className="text-sm ">Regional Paradigm Technician</div>
            <div className="text-sm ">Optimization</div>
          </Fragment>
        ),
      },
      {
        element: (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Active
          </span>
        ),
      },
      {
        element: <span>Admin</span>,
      },
      {
        element: (
          <a href="#" className="text-indigo-600 hover:text-indigo-900">
            Edit
          </a>
        ),
      },
    ],
  },
  {
    cells: [
      {
        element: (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium">Jane Cooper</div>
              <div className="text-sm ">jane.cooper@example.com</div>
            </div>
          </div>
        ),
      },
      {
        element: (
          <Fragment>
            <div className="text-sm ">Regional Paradigm Technician</div>
            <div className="text-sm ">Optimization</div>
          </Fragment>
        ),
      },
      {
        element: (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Active
          </span>
        ),
      },
      {
        element: <span>Admin</span>,
      },
      {
        element: (
          <a href="#" className="text-indigo-600 hover:text-indigo-900">
            Edit
          </a>
        ),
      },
    ],
  },
];

const ReposSettings: React.FC<{ tableData?: ITableData }> = ({ tableData }) => {
  const dispatch = useDispatch();

  const [reposTableData, setReposTableData] = useState(tableData);

  const { repos, isReposEmpty } = useShallowEqualSelector(({ settings }) => ({
    repos: settings.repos,
    isReposEmpty: settings.repos.length == 0,
  }));

  useMount(() => {
    dispatch(getRepos());
  });

  useEffect(() => {
    if (isReposEmpty) return;
    const rtCols = [{ name: 'Name' }, { name: '' }];
    const rtRows = repos.map(r => ({
      cells: [
        {
          element: <div>{r.name}</div>,
        },
        {
          element: <div> </div>,
        },
      ],
    }));
    console.log(rtCols, rtRows);
    setReposTableData({
      columns: rtCols,
      rows: rtRows,
    });
  }, [repos]);

  return (
    <Fragment>
      <Paper>
        {!isReposEmpty && <Table columns={reposTableData?.columns} rows={reposTableData?.rows} />}
      </Paper>
    </Fragment>
  );
};

export default ReposSettings;
