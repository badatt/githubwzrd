import React from 'react';
import clsx from 'clsx';
import { IElementProps } from 'types';
import cl from './Checkbox.module.scss';

export interface ICheckboxProps {
  name?: string;
  checked?: boolean;
  onChange?: (event: any) => void;
}

type Props = IElementProps & ICheckboxProps;

const Checkbox: React.FC<Props> = (props: Props) => {
  return (
    <label className={clsx(cl.main, props.className)}>
      <input
        name={props.name}
        component-name="Checkbox"
        type="checkbox"
        className={cl.chkBox}
        checked={props.checked}
        onChange={props.onChange}
      />
    </label>
  );
};

export default Checkbox;
