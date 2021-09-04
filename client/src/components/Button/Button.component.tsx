import React from 'react';
import clsx from 'clsx';
import { IElementProps, IChildrenProp } from 'types';
import cl from './Button.module.scss';
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
        cl.main,
        !props.disabled && cl[props.type],
        cl[props.size],
        props.fullWidth && cl.fullWidth,
        props.bordered && cl.bordered,
        props.contained && !props.bordered && cl.contained,
        props.loading && cl.loading,
        props.disabled && cl.disabled,
        props.className,
      )}
      component-name="Button"
      onClick={props.disabled ? undefined : props.onClick}
    >
      {props.icon && <span className={cl.btnIcon}>{props.icon && <i>{props.icon}</i>}</span>}
      {props.loading && <RotatingCircleIcon className={cl.btnIcon} />}
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
