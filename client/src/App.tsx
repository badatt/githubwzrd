import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import './styles/global.css';
import theme from 'modules/theme';
import history from 'modules/history';
import SystemAlerts from 'containers/SystemAlerts';
import Dashboard from 'routes/Dashboard';
import NotFound from 'routes/NotFound';

function App() {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route component={Dashboard} path="/" />
          <Route component={NotFound} />
        </Switch>
        <SystemAlerts />
      </ThemeProvider>
    </Router>
  );
}

export default App;
