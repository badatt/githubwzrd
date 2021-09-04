import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useShallowEqualSelector } from 'modules/hooks';
import { ITableData, Table } from 'components';
import { STATUS } from 'literals';
import { UserActions } from 'actions';
import * as View from './UserRepos.view';
import cl from './UserRepos.module.scss';

const UserRepos: React.FC = () => {
  const dispatch = useDispatch();
  const [userReposTableData, setUserReposTableDate] = useState<ITableData>();
  const { userRepos, savingReposStatus } = useShallowEqualSelector(({ settings, user }) => ({
    userRepos: user.data.repos,
    savingReposStatus: settings.savingReposStatus,
  }));

  const handleRemoveRepo = (name?: string) => {
    dispatch(UserActions.removeRepo(name));
  };

  useEffect(() => {
    const rtCols = [{ name: `Selected Repos (${userRepos?.length})`, width: 100 }];
    const rtRows = userRepos?.map(r => ({
      cells: [
        {
          element: <View.UserRepoName name={r} onRemoveRepo={() => handleRemoveRepo(r)} />,
        },
      ],
    }));
    setUserReposTableDate({
      columns: rtCols,
      rows: rtRows,
    });
  }, [userRepos]);

  return (
    <div className={cl.main}>
      <div className={cl.actions}>
        {savingReposStatus === STATUS.RUNNING && <View.LoadingButton />}
        {savingReposStatus !== STATUS.RUNNING && <View.ReposSaveBtn />}
      </div>
      <div className={cl.table}>
        <Table columns={userReposTableData?.columns} rows={userReposTableData?.rows} />
      </div>
    </div>
  );
};

export default UserRepos;
