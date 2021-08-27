import React, { Fragment } from 'react';
import { useDispatch, connect } from 'react-redux';
import { submit } from 'redux-form';
import { useMount } from 'react-use';
import { useShallowEqualSelector } from 'modules/hooks';
import * as ReposSettingsView from './ReposSettings.view';
import ReposSettingsForm, { formName } from './ReposSettings.form';
import { SettingsActions } from 'actions';
import { STATUS } from 'literals';
import { Loader } from 'components';

const ReposSettings: React.FC = () => {
  const dispatch = useDispatch();

  const { repos, isReposEmpty, loadingReposStatus, savingReposStatus } = useShallowEqualSelector(
    ({ settings }) => ({
      repos: settings.repos,
      isReposEmpty: settings.repos.length == 0,
      loadingReposStatus: settings.loadingReposStatus,
      savingReposStatus: settings.savingReposStatus,
    }),
  );

  const handleReposSettingsSubmit = (data: any) => {
    dispatch(SettingsActions.saveUserRepos(Object.keys(data).filter(d => data[d])));
  };

  useMount(() => {
    dispatch(SettingsActions.getRepos());
  });

  return (
    <Fragment>
      <ReposSettingsView.ReposSettingsMain>
        {loadingReposStatus == STATUS.RUNNING && <Loader />}
        {loadingReposStatus == STATUS.SUCCESS && (
          <Fragment>
            {savingReposStatus === STATUS.RUNNING && <ReposSettingsView.LoadingButton />}
            {savingReposStatus !== STATUS.RUNNING && (
              <ReposSettingsView.ReposSaveBtn onClick={() => dispatch(submit(formName))} />
            )}
            {!isReposEmpty && (
              <ReposSettingsForm repos={repos} onSubmit={handleReposSettingsSubmit} />
            )}
          </Fragment>
        )}
      </ReposSettingsView.ReposSettingsMain>
    </Fragment>
  );
};

export default connect()(ReposSettings);
