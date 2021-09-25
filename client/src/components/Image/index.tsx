import React, { Suspense, lazy } from 'react';
import { RotatingCircleIcon } from 'icons';
import cl from './Image.module.scss';
import { IProps } from './Image.component';

const LazyComponent = lazy(() => import('./Image.component'));

export default (props: IProps) => (
  <Suspense fallback={<RotatingCircleIcon className={cl.loader} />}>
    <LazyComponent {...props} />
  </Suspense>
);
