import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import './styles/global.css';
import history from 'modules/history';
import SystemAlerts from 'containers/SystemAlerts';
import { HomeRoute, SettingsRoute, NotFoundRoute } from 'routes';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/settings" component={SettingsRoute} />
        <Route exact path="/" component={HomeRoute} />
        <Route component={NotFoundRoute} />
      </Switch>
      <SystemAlerts />
    </Router>
  );
}

export default App;
