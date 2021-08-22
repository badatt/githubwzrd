import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { ITableData } from 'components/Table/Table.component';
import * as ReposSettingsView from './ReposSettings.view';
import { ReposData } from 'types/settings.type';
import { StoreState } from 'types';

export const formName = 'reposSettingsForm';

export interface IProps {
  repos?: ReposData[];
  tableData?: ITableData;
  userSavedRepos?: {};
}

const ReposSettingsForm: React.FC<IProps & InjectedFormProps<{}, IProps>> = ({
  repos,
  tableData,
  handleSubmit,
}) => {
  const [reposTableData, setReposTableData] = useState(tableData);
  useEffect(() => {
    const rtCols = [{ name: 'Name' }, { name: '' }];
    const rtRows = repos?.map(r => ({
      cells: [
        {
          element: r.name,
        },
        {
          element: <Field type="checkbox" name={r.name} id={r.name} component="input" />,
        },
      ],
    }));
    setReposTableData({
      columns: rtCols,
      rows: rtRows,
    });
  }, [repos]);
  return (
    <form onSubmit={handleSubmit}>
      <ReposSettingsView.ReposTable {...reposTableData} />
    </form>
  );
};

const ReduxReposSettingsForm = reduxForm<{}, IProps>({
  form: formName,
})(ReposSettingsForm);

export default connect((state: StoreState) => ({
  initialValues: (() => {
    const selectedRepos: { [key: string]: boolean } = {};
    state.user.data.repos?.forEach(r => (selectedRepos[r] = true));
    return selectedRepos;
  })(),
}))(ReduxReposSettingsForm);
