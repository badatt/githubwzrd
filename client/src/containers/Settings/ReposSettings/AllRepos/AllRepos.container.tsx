import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { useShallowEqualSelector } from 'modules/hooks';
import { Button, ITableData, Loader, Table } from 'components';
import { SettingsActions, UserActions } from 'actions';
import { STATUS } from 'literals';
import cl from './AllRepos.module.scss';
import { CheckCircleIcon, PlusCircleIcon } from 'icons';

const AllRepos: React.FC = () => {
  const dispatch = useDispatch();
  const [reposTableData, setReposTableData] = useState<ITableData>();
  const { repos, isReposEmpty, loadingReposStatus, userRepos } = useShallowEqualSelector(
    ({ settings, user }) => ({
      repos: settings.repos,
      isReposEmpty: settings.repos.data?.length == 0,
      loadingReposStatus: settings.loadingReposStatus,
      userRepos: user.data.repos,
    }),
  );

  useMount(() => {
    dispatch(SettingsActions.getRepos());
  });

  const handleAddRepo = (id?: string, name?: string) => {
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
            <Button
              key={r.id}
              iconOnly
              className={cl.repoAddBtn}
              disabled={userRepos?.includes(r.name!!)}
              onClick={() => handleAddRepo(r.id, r.name)}
            >
              {userRepos?.includes(r.name!!) ? (
                <CheckCircleIcon className={cl.repoAddedBtnIcon} />
              ) : (
                <PlusCircleIcon className={cl.repoAddBtnIcon} />
              )}
            </Button>
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
      {loadingReposStatus == STATUS.RUNNING && <Loader />}
      {loadingReposStatus == STATUS.SUCCESS && !isReposEmpty && (
        <Fragment>
          <div className={cl.actions}>
            <Button
              size="sm"
              text="previous"
              disabled={!repos.pageInfo?.hasPreviousPage}
              onClick={handlePrevious}
            />
            <Button
              size="sm"
              text="next"
              disabled={!repos.pageInfo?.hasNextPage}
              onClick={handleNext}
            />
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
