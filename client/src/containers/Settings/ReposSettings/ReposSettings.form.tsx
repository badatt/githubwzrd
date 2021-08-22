import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps, getFormValues } from 'redux-form';
import { ITableData } from 'components/Table/Table.component';
import * as ReposSettingsView from './ReposSettings.view';
import { ReposData } from 'types/settings.type';

export const formName = 'reposSettingsForm';

export interface IProps {
  repos?: ReposData[];
  tableData?: ITableData;
}

export interface IReposSettingsFormData {
  selectedRepos?: string[];
}

let ReposSettingsForm: React.FC<InjectedFormProps<IReposSettingsFormData> & IProps> = ({
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

const reposSettingsFormSelector = getFormValues(formName);

ReposSettingsForm = connect(state => {
  const selectedRepos = reposSettingsFormSelector(state);
  return { selectedRepos };
})(ReposSettingsForm);

export default reduxForm<IReposSettingsFormData, IProps>({
  form: formName,
})(ReposSettingsForm);
