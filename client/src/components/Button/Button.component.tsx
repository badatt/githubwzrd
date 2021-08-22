import React from 'react';
import clsx from 'clsx';
import { IElementProps } from 'types';
import classes from './Button.module.css';

interface IButton {
  type: 'primary' | 'secondary' | 'danger' | 'neutral';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  text?: string;
  icon?: JSX.Element;
  fullWidth?: boolean;
  bordered?: boolean;
  contained?: boolean;
}

type Props = IButton & IElementProps;

const Button = (props: Props): JSX.Element => {
  return (
    <button
      className={clsx(
        classes['main'],
        props.className,
        classes[props.type],
        classes[props.size],
        props.disabled && classes['disabled'],
        props.fullWidth && classes['full-width'],
        props.bordered && classes['bordered'],
        props.contained && !props.bordered && classes['contained'],
      )}
    >
      <span className={classes['btn-icon']}>{props.icon && <i>{props.icon}</i>}</span>
      <span>{props.text}</span>
    </button>
  );
};

Button.defaultProps = {
  type: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  text: '',
  fullWidth: false,
  bordered: false,
  contained: true,
};

export default Button;
