import React, { Suspense, lazy } from 'react';
import { Loader } from 'components';

const LazyComponent = lazy(() => import('./App'));

export default (props: any) => (
  <Suspense fallback={<Loader block size="xl" />}>
    <LazyComponent {...props} />
  </Suspense>
);
