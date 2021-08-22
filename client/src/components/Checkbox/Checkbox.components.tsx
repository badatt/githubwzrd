import React from 'react';
import clsx from 'clsx';
import { IElementProps } from 'types';
import classes from './Checkbox.module.css';

type Props = IElementProps;

const Checkbox = (props: Props) => {
  return (
    <label className={clsx(classes['main'], props.className)}>
      <input type="checkbox" className={classes['chk-box']} />
    </label>
  );
};

export default Checkbox;
