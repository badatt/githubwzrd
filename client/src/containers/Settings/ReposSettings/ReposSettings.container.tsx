import React, { Fragment } from 'react';
import { Paper, Table } from 'components';

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
              <div className="text-sm font-medium text-gray-900">Jane Cooper</div>
              <div className="text-sm text-gray-500">jane.cooper@example.com</div>
            </div>
          </div>
        ),
      },
      {
        element: (
          <Fragment>
            <div className="text-sm text-gray-900">Regional Paradigm Technician</div>
            <div className="text-sm text-gray-500">Optimization</div>
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
              <div className="text-sm font-medium text-gray-900">Jane Cooper</div>
              <div className="text-sm text-gray-500">jane.cooper@example.com</div>
            </div>
          </div>
        ),
      },
      {
        element: (
          <Fragment>
            <div className="text-sm text-gray-900">Regional Paradigm Technician</div>
            <div className="text-sm text-gray-500">Optimization</div>
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
              <div className="text-sm font-medium text-gray-900">Jane Cooper</div>
              <div className="text-sm text-gray-500">jane.cooper@example.com</div>
            </div>
          </div>
        ),
      },
      {
        element: (
          <Fragment>
            <div className="text-sm text-gray-900">Regional Paradigm Technician</div>
            <div className="text-sm text-gray-500">Optimization</div>
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
              <div className="text-sm font-medium text-gray-900">Jane Cooper</div>
              <div className="text-sm text-gray-500">jane.cooper@example.com</div>
            </div>
          </div>
        ),
      },
      {
        element: (
          <Fragment>
            <div className="text-sm text-gray-900">Regional Paradigm Technician</div>
            <div className="text-sm text-gray-500">Optimization</div>
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
              <div className="text-sm font-medium text-gray-900">Jane Cooper</div>
              <div className="text-sm text-gray-500">jane.cooper@example.com</div>
            </div>
          </div>
        ),
      },
      {
        element: (
          <Fragment>
            <div className="text-sm text-gray-900">Regional Paradigm Technician</div>
            <div className="text-sm text-gray-500">Optimization</div>
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
              <div className="text-sm font-medium text-gray-900">Jane Cooper</div>
              <div className="text-sm text-gray-500">jane.cooper@example.com</div>
            </div>
          </div>
        ),
      },
      {
        element: (
          <Fragment>
            <div className="text-sm text-gray-900">Regional Paradigm Technician</div>
            <div className="text-sm text-gray-500">Optimization</div>
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
              <div className="text-sm font-medium text-gray-900">Jane Cooper</div>
              <div className="text-sm text-gray-500">jane.cooper@example.com</div>
            </div>
          </div>
        ),
      },
      {
        element: (
          <Fragment>
            <div className="text-sm text-gray-900">Regional Paradigm Technician</div>
            <div className="text-sm text-gray-500">Optimization</div>
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
              <div className="text-sm font-medium text-gray-900">Jane Cooper</div>
              <div className="text-sm text-gray-500">jane.cooper@example.com</div>
            </div>
          </div>
        ),
      },
      {
        element: (
          <Fragment>
            <div className="text-sm text-gray-900">Regional Paradigm Technician</div>
            <div className="text-sm text-gray-500">Optimization</div>
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
              <div className="text-sm font-medium text-gray-900">Jane Cooper</div>
              <div className="text-sm text-gray-500">jane.cooper@example.com</div>
            </div>
          </div>
        ),
      },
      {
        element: (
          <Fragment>
            <div className="text-sm text-gray-900">Regional Paradigm Technician</div>
            <div className="text-sm text-gray-500">Optimization</div>
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

const ReposSettings: React.FC = () => {
  return (
    <Fragment>
      <Paper>
        <Table columns={columns} rows={rows} />
      </Paper>
    </Fragment>
  );
};

export default ReposSettings;
