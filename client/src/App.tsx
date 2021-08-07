import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet-async';

import theme from 'modules/theme';
import history from 'modules/history';
import SystemAlerts from 'containers/SystemAlerts';
import config from 'config';
import Dashboard from 'routes/Dashboard';
import NotFound from 'routes/NotFound';

function App() {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <Helmet
          defaultTitle={config.name}
          defer={false}
          encodeSpecialCharacters
          htmlAttributes={{ lang: 'pt-br' }}
          titleAttributes={{ itemprop: 'name', lang: 'pt-br' }}
          titleTemplate={`%s | ${config.name}`}
        >
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <Switch>
          <Route component={Dashboard} path="/dashboard" />
          <Route component={NotFound} />
        </Switch>
        <SystemAlerts />
      </ThemeProvider>
    </Router>
  );
}

export default App;
