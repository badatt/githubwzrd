import React, { Fragment } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Routes } from 'literals';
import history from 'modules/history';
import SystemAlerts from 'containers/SystemAlerts';
import { HomeRoute, SettingsRoute, NotFoundRoute } from 'routes';
import Header from 'containers/Header/Header.container';
import Footer from 'containers/Footer/Footer.container';
import * as LayoutView from './Layout.view';

const Layout = () => {
  return (
    <Fragment>
      <LayoutView.LayoutMain>
        <Header />
        <LayoutView.Layout>
          <Router history={history}>
            <Switch>
              <Route exact path={Routes.SETTINGS} component={SettingsRoute} />
              <Route exact path={Routes.HOME} component={HomeRoute} />
              <Route component={NotFoundRoute} />
            </Switch>
            <SystemAlerts />
          </Router>
        </LayoutView.Layout>
        <Footer />
      </LayoutView.LayoutMain>
    </Fragment>
  );
};

export default Layout;
