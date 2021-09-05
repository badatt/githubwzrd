import React, { Fragment } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Routes } from 'literals';
import history from 'modules/history';
import { HomeRoute, SettingsRoute, NotFoundRoute } from 'routes';
import { HeaderContainer, FooterContainer, SystemAlerts } from 'containers';
import cl from './WebLayout.module.scss';

const Layout = () => {
  return (
    <Fragment>
      <main className={cl.main}>
        <HeaderContainer />
        <article className={cl.layout}>
          <Router history={history}>
            <Switch>
              <Route exact path={Routes.SETTINGS} component={SettingsRoute} />
              <Route exact path={Routes.HOME} component={HomeRoute} />
              <Route component={NotFoundRoute} />
            </Switch>
            <SystemAlerts />
          </Router>
        </article>
        <FooterContainer />
      </main>
    </Fragment>
  );
};

export default Layout;
