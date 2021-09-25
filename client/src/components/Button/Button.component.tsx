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
  iconOnly?: boolean;
}

type Props = IButton & IElementProps & IChildrenProp;

const Button = (props: Props): JSX.Element => {
  return (
    <button
      className={clsx(
        cl.main,
        !props.disabled && !props.iconOnly && cl[props.type],
        !props.iconOnly && cl[props.size],
        !props.iconOnly && props.fullWidth && cl.fullWidth,
        !props.iconOnly && props.bordered && cl.bordered,
        !props.iconOnly && props.contained && !props.bordered && cl.contained,
        props.loading && cl.loading,
        props.disabled && cl.disabled,
        props.iconOnly && cl.iconOnly,
        props.className,
      )}
      component-name="Button"
      onClick={props.disabled ? undefined : props.onClick}
    >
      {props.icon && <i className={cl.btnIcon}>{props.icon}</i>}
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
  iconOnly: false,
};

export default Button;
