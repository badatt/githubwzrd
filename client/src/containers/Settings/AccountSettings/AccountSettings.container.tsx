import React, { Fragment } from 'react';
import { useShallowEqualSelector } from 'modules/hooks';
import { Paper, Separator } from 'components';

import * as AccountSettingsView from './AccountSettings.view';

const AccountSettings: React.FC = () => {
  const { data } = useShallowEqualSelector(({ user }) => ({
    data: user.data,
  }));
  return (
    <Fragment>
      <Paper>
        <AccountSettingsView.Details {...data} />
        <Separator />
        <AccountSettingsView.Note>
          The details are just for public view, for more details visit the{' '}
          <a href={data.url} target="_blank">
            github profile page
          </a>
          {` `} for more details.
        </AccountSettingsView.Note>
      </Paper>
    </Fragment>
  );
};

export default AccountSettings;
