import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { useShallowEqualSelector } from 'modules/hooks';
import { getRepos } from 'actions/settings.action';
import * as ReposSettingsView from './ReposSettings.view';
import ReposSettingsForm from './ReposSettings.form';

const ReposSettings: React.FC = () => {
  const dispatch = useDispatch();

  const { repos, isReposEmpty } = useShallowEqualSelector(({ settings }) => ({
    repos: settings.repos,
    isReposEmpty: settings.repos.length == 0,
  }));

  useMount(() => {
    dispatch(getRepos());
  });

  return (
    <Fragment>
      <ReposSettingsView.ReposSettingsMain>
        <ReposSettingsView.ReposSaveBtn onClick={() => console.log('Submitted buton')} />
        {!isReposEmpty && <ReposSettingsForm repos={repos} />}
      </ReposSettingsView.ReposSettingsMain>
    </Fragment>
  );
};

export default ReposSettings;
