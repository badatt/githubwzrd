import React, { Fragment } from 'react';

function Dashboard() {
  return (
    <Fragment>
      <h1>This is dashboard page</h1>
      <div className="bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden">
        <div className="sm:flex sm:items-center px-6 py-4">
          <img
            className="block h-16 sm:h-24 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0"
            src="https://avatars2.githubusercontent.com/u/4323180?s=400&u=4962a4441fae9fba5f0f86456c6c506a21ffca4f&v=4"
            alt=""
          />
          <div className="text-center sm:text-left sm:flex-grow">
            <div className="mb-4">
              <p className="text-xl leading-tight">Adam Wathan</p>
              <p className="text-sm leading-tight text-grey-dark">Developer at NothingWorks Inc.</p>
            </div>
            <div>
              <button className="text-sm font-semibold rounded-full px-4 py-1 leading-normal bg-white border-solid border border-purple-500 text-purple-500 hover:bg-purple hover:text-purple-900">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
      ;
    </Fragment>
  );
}

export default Dashboard;