import React, { Suspense, lazy } from 'react';
import { Loader } from 'components';

const HomeRouteNonLazy = lazy(() => import('./Home.route'));

export const HomeRoute = (props: any) => (
  <Suspense fallback={<Loader block size="xl" />}>
    <HomeRouteNonLazy {...props} />
  </Suspense>
);

const SettingsRouteNonLazy = lazy(() => import('./Settings.route'));

export const SettingsRoute = (props: any) => (
  <Suspense fallback={<Loader block size="xl" />}>
    <SettingsRouteNonLazy {...props} />
  </Suspense>
);

const NotFoundRouteNonLazy = lazy(() => import('./NotFound.route'));

export const NotFoundRoute = (props: any) => (
  <Suspense fallback={<Loader block size="xl" />}>
    <NotFoundRouteNonLazy {...props} />
  </Suspense>
);
