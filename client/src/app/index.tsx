import React from 'react';
import { Route, Switch } from 'react-router';
//import { App as Home } from 'app/containers/App';
import { Home } from 'app/containers/Home/Home';
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
));
