import React, { Fragment } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Routes } from 'literals';
import history from 'modules/history';
import { HomeRoute, SettingsRoute, NotFoundRoute } from 'routes';
import { HeaderContainer, FooterContainer, SystemAlerts } from 'containers';
import * as LayoutView from './WebLayout.view';

const Layout = () => {
  return (
    <Fragment>
      <LayoutView.LayoutMain>
        <HeaderContainer />
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
        <FooterContainer />
      </LayoutView.LayoutMain>
    </Fragment>
  );
};

export default Layout;
