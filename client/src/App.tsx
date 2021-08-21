import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Routes } from 'literals';
import './styles/global.css';
import history from 'modules/history';
import SystemAlerts from 'containers/SystemAlerts';
import { HomeRoute, SettingsRoute, NotFoundRoute } from 'routes';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={Routes.SETTINGS} component={SettingsRoute} />
        <Route exact path={Routes.HOME} component={HomeRoute} />
        <Route component={NotFoundRoute} />
      </Switch>
      <SystemAlerts />
    </Router>
  );
}

export default App;
