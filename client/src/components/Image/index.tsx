import React, { Suspense, lazy } from 'react';
import { RotatingCircleIcon } from 'icons';
import classes from './Image.module.css';
import { IProps } from './Image.component';

const LazyComponent = lazy(() => import('./Image.component'));

export default (props: IProps) => (
  <Suspense fallback={<RotatingCircleIcon className={classes['loader']} />}>
    <LazyComponent {...props} />
  </Suspense>
);
