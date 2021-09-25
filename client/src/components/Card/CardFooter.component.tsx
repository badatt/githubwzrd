import React from 'react';
import clsx from 'clsx';
import cl from './Card.module.scss';
import { IChildrenProp, IElementProps } from 'types';

export interface IProps {}

export default (props: IProps & IElementProps & IChildrenProp) => {
  return <div className={clsx(cl.footer, props.className)}>{props.children}</div>;
};
