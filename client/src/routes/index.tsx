import React, { Suspense, lazy } from 'react';
import { Loader } from 'components';

const NotFoundRouteLazy = lazy(() => import('./NotFound.route'));
export const NotFoundRoute = (props: any) => (
  <Suspense fallback={<Loader full size="xl" type="grow" />}>
    <NotFoundRouteLazy {...props} />
  </Suspense>
);

const HomeRouteLazy = lazy(() => import('./Home.route'));
export const HomeRoute = (props: any) => (
  <Suspense fallback={<Loader full size="xl" type="grow" />}>
    <HomeRouteLazy {...props} />
  </Suspense>
);

const SettingsRouteLazy = lazy(() => import('./Settings.route'));
export const SettingsRoute = (props: any) => (
  <Suspense fallback={<Loader full size="xl" type="grow" />}>
    <SettingsRouteLazy {...props} />
  </Suspense>
);

const SignupRouteRouteLazy = lazy(() => import('./Signup.route'));
export const SignupRoute = (props: any) => (
  <Suspense fallback={<Loader full size="xl" type="grow" />}>
    <SignupRouteRouteLazy {...props} />
  </Suspense>
);

const PullsRouteLazy = lazy(() => import('./Pulls.route'));
export const PullsRoute = (props: any) => (
  <Suspense fallback={<Loader full size="xl" type="grow" />}>
    <PullsRouteLazy {...props} />
  </Suspense>
);
