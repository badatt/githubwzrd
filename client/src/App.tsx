import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import './styles/global.css';
import history from 'modules/history';
import SystemAlerts from 'containers/SystemAlerts';
import HomeRoute from 'routes/Home.route';
import NotFoundRoute from 'routes/NotFound.route';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route component={HomeRoute} path="/" />
        <Route component={NotFoundRoute} />
      </Switch>
      <SystemAlerts />
    </Router>
  );
}

export default App;
