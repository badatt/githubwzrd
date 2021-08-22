import React, { Suspense, lazy } from 'react';
import Loader from 'components/Loader';

const LazyComponent = lazy(() => import('./App'));

export default (props: any) => (
  <Suspense fallback={<Loader block size={60} type="grow" />}>
    <LazyComponent {...props} />
  </Suspense>
);
