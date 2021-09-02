import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { useShallowEqualSelector } from 'modules/hooks';
import { Button, ITableData, Loader, Table } from 'components';
import { SettingsActions } from 'actions';
import { STATUS } from 'literals';
import * as View from './AllRepos.view';
import cl from './AllRepos.module.scss';

const AllRepos: React.FC = () => {
  const dispatch = useDispatch();
  const [reposTableData, setReposTableData] = useState<ITableData>();
  const { repos, isReposEmpty, loadingReposStatus } = useShallowEqualSelector(({ settings }) => ({
    repos: settings.repos,
    isReposEmpty: settings.repos.length == 0,
    loadingReposStatus: settings.loadingReposStatus,
  }));
  useMount(() => {
    dispatch(SettingsActions.getRepos());
  });

  useEffect(() => {
    const rtCols = [
      { name: 'Repo name', width: 30 },
      { name: 'Description', width: 60 },
      { name: '', width: 10 },
    ];
    const rtRows = repos?.map(r => ({
      cells: [
        {
          element: r.name,
        },
        {
          element: r.description,
        },
        {
          element: <View.RepoAddBtn />,
        },
      ],
    }));
    setReposTableData({
      columns: rtCols,
      rows: rtRows,
    });
  }, [repos]);

  return (
    <div className={cl.main}>
      {loadingReposStatus == STATUS.RUNNING && <Loader />}
      {loadingReposStatus == STATUS.SUCCESS && !isReposEmpty && (
        <Fragment>
          <div className={cl.actions}>
            <Button size="sm" text="previous" />
            <Button size="sm" text="next" />
          </div>
          <div className={cl.table}>
            <Table columns={reposTableData?.columns} rows={reposTableData?.rows} />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default AllRepos;
