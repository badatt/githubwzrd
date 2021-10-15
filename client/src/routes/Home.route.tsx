import React from 'react';
import history from 'modules/history';
import { Button, Page, Paper } from 'components';
import { Routes } from 'literals';

export default (): JSX.Element => {
  return (
    <Page title="Dashboard">
      <Paper>
        <Button onClick={() => history.push(Routes.PULLS)} text="Pulls" />
      </Paper>
    </Page>
  );
};
