import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { useShallowEqualSelector } from 'modules/hooks';
import { ITableData, Table } from 'components';
import { SettingsActions, UserActions } from 'actions';
import cl from './AllRepos.module.scss';
import * as View from './AllRepos.view';
import { STATUS } from 'literals';

export default () => {
  const dispatch = useDispatch();
  const [reposTableData, setReposTableData] = useState<ITableData>();
  const { repos, userRepos, loadingReposStatus } = useShallowEqualSelector(
    ({ settings, user }) => ({
      repos: settings.repos,
      userRepos: user.data.repos,
      loadingReposStatus: settings.loadingReposStatus,
    }),
  );

  useMount(() => {
    dispatch(SettingsActions.getRepos());
  });

  const handleAddRepo = (name?: string) => {
    dispatch(UserActions.addRepo(name));
  };

  useEffect(() => {
    const rtCols = [
      { name: 'Repo name', width: 30 },
      { name: 'Description', width: 60 },
      { name: '', width: 10 },
    ];
    const rtRows = repos?.data?.map(r => ({
      cells: [
        {
          element: r.name,
        },
        {
          element: r.description,
        },
        {
          element: (
            <View.ReposAddBtn
              key={r.id}
              className={cl.repoAddBtn}
              disabled={userRepos?.includes(r.name!!)}
              onClick={() => handleAddRepo(r.name)}
              isAddedAlready={userRepos?.includes(r.name!!)}
            />
          ),
        },
      ],
    }));
    setReposTableData({
      columns: rtCols,
      rows: rtRows,
    });
  }, [repos, userRepos]);

  const handleNext = () => {
    dispatch(SettingsActions.getRepos({ after: repos.pageInfo?.endCursor }));
  };

  const handlePrevious = () => {
    dispatch(SettingsActions.getRepos({ before: repos.pageInfo?.startCursor }));
  };

  return (
    <div className={cl.main}>
      <div className={cl.actions}>
        <View.PreviousBtn disabled={!repos.pageInfo?.hasPreviousPage} onClick={handlePrevious} />
        <View.NextBtn disabled={!repos.pageInfo?.hasNextPage} onClick={handleNext} />
      </div>
      <div className={cl.table}>
        <Table
          columns={reposTableData?.columns}
          rows={reposTableData?.rows}
          loading={loadingReposStatus == STATUS.RUNNING}
        />
      </div>
    </div>
  );
};
