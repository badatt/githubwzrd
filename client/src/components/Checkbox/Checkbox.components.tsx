import React from 'react';
import clsx from 'clsx';
import { IElementProps } from 'types';
import classes from './Checkbox.module.css';

export interface ICheckboxProps {
  name?: string;
  checked?: boolean;
  onChange?: (event: any) => void;
}

type Props = IElementProps & ICheckboxProps;

const Checkbox: React.FC<Props> = (props: Props) => {
  return (
    <label className={clsx(classes['main'], props.className)}>
      <input
        name={props.name}
        type="checkbox"
        className={classes['chk-box']}
        checked={props.checked}
        onChange={props.onChange}
      />
    </label>
  );
};

export default Checkbox;
