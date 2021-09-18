import React from 'react';
import clsx from 'clsx';
import { IChildrenProp, IElementProps } from 'types';
import cl from './Link.module.scss';

export interface IProps {
  href?: string;
  newTab?: boolean;
}

const Link = (props: IProps & IChildrenProp & IElementProps): JSX.Element => {
  const { href, newTab } = props;
  return (
    <a
      component-name="Link"
      className={clsx(cl.main, props.className)}
      href={href}
      target={newTab ? '_blank' : ''}
    >
      {props.children}
    </a>
  );
};

Link.defaultProps = {
  newTab: true,
};

export default Link;
