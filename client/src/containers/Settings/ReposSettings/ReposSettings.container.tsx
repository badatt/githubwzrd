import React, { Fragment } from 'react';
import { useDispatch, connect } from 'react-redux';
import { submit } from 'redux-form';
import { useMount } from 'react-use';
import { useShallowEqualSelector } from 'modules/hooks';
import * as ReposSettingsView from './ReposSettings.view';
import ReposSettingsForm, { formName } from './ReposSettings.form';
import { SettingsActions } from 'actions';

const ReposSettings: React.FC = () => {
  const dispatch = useDispatch();

  const { repos, isReposEmpty } = useShallowEqualSelector(({ settings }) => ({
    repos: settings.repos,
    isReposEmpty: settings.repos.length == 0,
  }));

  const handleReposSettingsSubmit = (data: any) => {
    dispatch(SettingsActions.saveUserRepos(Object.keys(data).filter(d => data[d])));
  };

  useMount(() => {
    dispatch(SettingsActions.getRepos());
  });

  return (
    <Fragment>
      <ReposSettingsView.ReposSettingsMain>
        <ReposSettingsView.ReposSaveBtn onClick={() => dispatch(submit(formName))} />
        {!isReposEmpty && <ReposSettingsForm repos={repos} onSubmit={handleReposSettingsSubmit} />}
      </ReposSettingsView.ReposSettingsMain>
    </Fragment>
  );
};

export default connect()(ReposSettings);
