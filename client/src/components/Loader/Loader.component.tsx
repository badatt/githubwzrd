import React, { Fragment } from 'react';
import clsx from 'clsx';
import classes from './Loader.module.css';

interface IProps {
  block?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  type?: 'grow' | 'pulse' | 'rotate';
}

const LoaderGrow = (props: IProps) => {
  return (
    <div
      className={clsx(
        classes['main'],
        classes['loader-grow-main'],
        props.block && classes['block'],
        classes[props.size!!],
      )}
    >
      <div className={classes['loader-grow']}></div>
    </div>
  );
};

const LoaderPulse = (props: IProps) => {
  return (
    <div
      className={clsx(
        classes['main'],
        classes['loader-pulse-main'],
        props.block && classes['block'],
        classes[props.size!!],
      )}
    >
      <div className={classes['loader-pulse']}></div>
      <div className={clsx(classes['loader-pulse'], classes['loader-pulse-2'])}></div>
    </div>
  );
};

const LoaderRotate = (props: IProps) => {
  return (
    <div
      className={clsx(
        classes['main'],
        classes['loader-rotate-main'],
        props.block && classes['block'],
        classes[props.size!!],
      )}
    >
      <svg viewBox="25 25 50 50" className={classes['loader-rotate']}>
        <circle
          cx="50"
          cy="50"
          fill="none"
          r="20"
          strokeWidth="2"
          className={classes['loader-rotate-circle']}
        ></circle>
      </svg>
    </div>
  );
};

const Loader = (props: IProps): JSX.Element => {
  return (
    <Fragment>
      {props.type === 'grow' && <LoaderGrow {...props} />}
      {props.type === 'pulse' && <LoaderPulse {...props} />}
      {props.type === 'rotate' && <LoaderRotate {...props} />}
    </Fragment>
  );
};

Loader.defaultProps = {
  block: false,
  size: 'md',
  type: 'grow',
};

export default Loader;
