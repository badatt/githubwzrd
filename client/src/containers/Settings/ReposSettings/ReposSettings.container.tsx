import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { useMount } from 'react-use';
import { useShallowEqualSelector } from 'modules/hooks';
import * as ReposSettingsView from './ReposSettings.view';
import { SettingsActions } from 'actions';
import { STATUS } from 'literals';
import { Loader } from 'components';
import { ITableData } from 'components/Table/Table.component';
import classes from './ReposSettings.module.css';

const ReposSettings: React.FC = () => {
  const dispatch = useDispatch();

  const [reposTableData, setReposTableData] = useState<ITableData>();
  const [userReposTableData, setUserReposTableDate] = useState<ITableData>();

  const { repos, isReposEmpty, loadingReposStatus, userRepos, savingReposStatus } =
    useShallowEqualSelector(({ settings, user }) => ({
      repos: settings.repos,
      userRepos: user.data.repos,
      isReposEmpty: settings.repos.length == 0,
      loadingReposStatus: settings.loadingReposStatus,
      savingReposStatus: settings.savingReposStatus,
    }));

  /* const handleReposSettingsSubmit = (data: any) => {
    dispatch(SettingsActions.saveUserRepos(Object.keys(data).filter(d => data[d])));
  }; */

  useMount(() => {
    dispatch(SettingsActions.getRepos());
  });

  useEffect(() => {
    const rtCols = [
      { name: 'Available repos', width: 30 },
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
          element: <ReposSettingsView.RepoAddBtn />,
        },
      ],
    }));
    setReposTableData({
      columns: rtCols,
      rows: rtRows,
    });
  }, [repos]);

  useEffect(() => {
    const rtCols = [{ name: 'Selected repos', width: 100 }];
    const rtRows = userRepos?.map(r => ({
      cells: [
        {
          element: <ReposSettingsView.UserRepoName name={r} />,
        },
      ],
    }));
    setUserReposTableDate({
      columns: rtCols,
      rows: rtRows,
    });
  }, [userRepos]);

  return (
    <Fragment>
      <ReposSettingsView.ReposSettingsMain>
        {loadingReposStatus == STATUS.RUNNING && <Loader />}
        {loadingReposStatus == STATUS.SUCCESS && (
          <Fragment>
            {!isReposEmpty && <ReposSettingsView.ReposTable {...reposTableData} />}
          </Fragment>
        )}
        <div className={classes['user-repos']}>
          {savingReposStatus === STATUS.RUNNING && <ReposSettingsView.LoadingButton />}
          {loadingReposStatus == STATUS.SUCCESS && (
            <Fragment>
              <ReposSettingsView.ReposTable {...userReposTableData} />
            </Fragment>
          )}
        </div>
      </ReposSettingsView.ReposSettingsMain>
    </Fragment>
  );
};

export default connect()(ReposSettings);
