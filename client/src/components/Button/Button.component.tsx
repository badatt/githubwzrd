import React from 'react';
import clsx from 'clsx';
import { IElementProps, IChildrenProp } from 'types';
import classes from './Button.module.css';
import { RotatingCircleIcon } from 'icons';

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

type Props = IButton & IElementProps & IChildrenProp;

const Button = (props: Props): JSX.Element => {
  return (
    <button
      className={clsx(
        classes['main'],
        props.className,
        !props.disabled && classes[props.type],
        classes[props.size],
        props.fullWidth && classes['full-width'],
        props.bordered && classes['bordered'],
        props.contained && !props.bordered && classes['contained'],
        props.loading && classes['loading'],
        props.disabled && classes['disabled'],
      )}
      component-name="Button"
      onClick={props.onClick}
    >
      {props.icon && (
        <span className={classes['btn-icon']}>{props.icon && <i>{props.icon}</i>}</span>
      )}
      {props.loading && <RotatingCircleIcon className={classes['btn-icon']} />}
      {props.text}
      {props.children}
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
