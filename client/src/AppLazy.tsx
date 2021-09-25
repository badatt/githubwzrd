import React, { Suspense, lazy } from 'react';
import { Loader } from 'components';

const LazyComponent = lazy(() => import('./App'));

export default (props: any) => (
  <Suspense fallback={<Loader full size="xl" type="grow" />}>
    <LazyComponent {...props} />
  </Suspense>
);
