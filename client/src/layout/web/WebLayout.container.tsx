import React, { Fragment } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { Routes, STATUS } from 'literals';
import history from 'modules/history';
import { useShallowEqualSelector } from 'modules/hooks';
import { SignupRoute, HomeRoute, SettingsRoute, NotFoundRoute } from 'routes';
import { HeaderContainer, FooterContainer, SystemAlerts } from 'containers';
import { getUser } from 'actions/user.action';
import cl from './WebLayout.module.scss';
import { Loader } from 'components';

export default () => {
  const dispatch = useDispatch();

  const { getUserStatus, getUserError } = useShallowEqualSelector(({ user }) => ({
    data: user?.data,
    getUserStatus: user.status,
    getUserError: user.error,
  }));

  useMount(() => {
    dispatch(getUser());
  });

  return (
    <main className={cl.main}>
      {getUserStatus === STATUS.ERROR && getUserError.code === 404 && (
        <Router history={history}>
          <Switch>
            <Route path={Routes.HOME} component={SignupRoute} />
          </Switch>
          <SystemAlerts />
        </Router>
      )}
      {getUserStatus === STATUS.RUNNING && <Loader full size="xl" type="grow" />}
      {getUserStatus === STATUS.SUCCESS && (
        <Fragment>
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
        </Fragment>
      )}
    </main>
  );
};
