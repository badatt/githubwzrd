import React, { useEffect, useState } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { ITableData } from 'components/Table/Table.component';

import * as ReposSettingsView from './ReposSettings.view';
import { Checkbox } from 'components';
import { ReposData } from 'types/settings.type';

export interface IProps {
  repos?: ReposData[];
  tableData?: ITableData;
}

export interface IReposSettingsFormData {
  repos?: string[];
}

const ReposSettingsForm: React.FC<InjectedFormProps<IReposSettingsFormData> & IProps> = ({
  handleSubmit,
  repos,
  tableData,
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

export default reduxForm<IReposSettingsFormData, IProps>({
  form: 'reposSettingsForm',
})(ReposSettingsForm);
