//export { default as HomeRoute } from './Home.route';
//export { default as NotFoundRoute } from './NotFound.route';
//export { default as SettingsRoute } from './Settings.route';
import React, { Suspense, lazy } from 'react';
import Loader from 'components/Loader';

const HomeRouteNonLazy = lazy(() => import('./Home.route'));

export const HomeRoute = (props: any) => (
  <Suspense fallback={<Loader block size={60} type="grow" />}>
    <HomeRouteNonLazy {...props} />
  </Suspense>
);

const SettingsRouteNonLazy = lazy(() => import('./Settings.route'));

export const SettingsRoute = (props: any) => (
  <Suspense fallback={<Loader block size={60} type="grow" />}>
    <SettingsRouteNonLazy {...props} />
  </Suspense>
);

const NotFoundRouteNonLazy = lazy(() => import('./NotFound.route'));

export const NotFoundRoute = (props: any) => (
  <Suspense fallback={<Loader block size={60} type="grow" />}>
    <NotFoundRouteNonLazy {...props} />
  </Suspense>
);
