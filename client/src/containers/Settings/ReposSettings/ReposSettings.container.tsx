import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { useShallowEqualSelector } from 'modules/hooks';
import { getRepos } from 'actions/settings.action';
import { ITableData } from 'components/Table/Table.component';
import { Checkbox } from 'components';
import * as ReposSettingsView from './ReposSettings.view';

const ReposSettings: React.FC<{ tableData?: ITableData }> = ({ tableData }) => {
  const dispatch = useDispatch();

  const [reposTableData, setReposTableData] = useState(tableData);

  const { repos, isReposEmpty } = useShallowEqualSelector(({ settings }) => ({
    repos: settings.repos,
    isReposEmpty: settings.repos.length == 0,
  }));

  useMount(() => {
    dispatch(getRepos());
  });

  useEffect(() => {
    if (isReposEmpty) return;
    const rtCols = [{ name: 'Name' }, { name: '' }];
    const rtRows = repos.map(r => ({
      cells: [
        {
          element: r.name,
        },
        {
          element: <Checkbox />,
        },
      ],
    }));
    setReposTableData({
      columns: rtCols,
      rows: rtRows,
    });
  }, [repos]);

  return (
    <Fragment>
      <ReposSettingsView.ReposSettingsMain>
        <ReposSettingsView.ReposSaveBtn />
        {!isReposEmpty && <ReposSettingsView.ReposTable {...reposTableData} />}
      </ReposSettingsView.ReposSettingsMain>
    </Fragment>
  );
};

export default ReposSettings;
