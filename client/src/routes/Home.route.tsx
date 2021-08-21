import React from 'react';
import Layout from 'containers/Layout/Layout.container';

function Dashboard() {
  return (
    <Layout title="Dashboard">
      <div className="mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {Array.from(Array(4).keys()).map(k => (
            <Random key={k} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

const Random = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 sm:px-8 sm:py-12 sm:gap-x-8 md:py-16 bg-white dark:bg-gray-900 rounded-lg">
    <div className="relative col-start-1 row-start-1 px-4 pt-40 pb-3 bg-gradient-to-t from-gray-900 dark:from-gray-100 sm:bg-none">
      <p className="text-sm font-medium text-black dark:text-white sm:mb-1 sm:text-gray-500">
        Entire house
      </p>
      <h2 className="text-xl font-semibold text-black dark:text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">
        Beach House in Collingwood
      </h2>
    </div>
    <div className="col-start-1 row-start-2 px-4 sm:pb-16">
      <div className="flex items-center text-sm font-medium my-5 sm:mt-2 sm:mb-4">
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="text-violet-600 dark:text-gray-300"
        >
          <path d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z" />
        </svg>
        <div className="ml-1">
          <span className="text-black dark:text-white">4.94</span>
          <span className="sm:hidden md:inline text-black dark:text-white">(128)</span>
        </div>
        <div className="text-base font-normal mx-2">·</div>
        <div className="text-black dark:text-white">Collingwood, Ontario</div>
      </div>
      <hr className="w-16 border-gray-300 hidden sm:block" />
    </div>
    <div className="col-start-1 row-start-3 space-y-3 px-4">
      <p className="flex items-center text-black dark:text-white text-sm font-medium">
        <img
          src="https://source.unsplash.com/1600x900/?villa,cottage,house,hotel"
          alt=""
          className="w-6 h-6 rounded-full mr-2 bg-gray-100"
        />
        Hosted by Kevin Francis
      </p>
      <button
        type="button"
        className="bg-violet-100 text-violet-700 text-base font-semibold px-6 py-2 rounded-lg text-black dark:text-white"
      >
        Check availability
      </button>
    </div>
    <div className="col-start-1 row-start-1 flex sm:col-start-2 sm:row-span-3">
      <div className="w-full grid grid-cols-3 grid-rows-2 gap-2">
        <div className="relative col-span-3 row-span-2 md:col-span-2">
          <img
            src="https://source.unsplash.com/1600x900/?villa,cottage,house,hotel"
            alt=""
            className="absolute inset-0 w-full h-full object-cover bg-gray-100 sm:rounded-lg"
          />
        </div>
        <div className="relative hidden md:block">
          <img
            src="https://source.unsplash.com/1600x900/?villa,cottage,house,hotel"
            alt=""
            className="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100"
          />
        </div>
        <div className="relative hidden md:block">
          <img
            src="https://source.unsplash.com/1600x900/?villa,cottage,house,hotel"
            alt=""
            className="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
