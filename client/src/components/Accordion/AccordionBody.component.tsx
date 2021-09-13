import React from 'react';
import clsx from 'clsx';
import cl from './Accordion.module.scss';
import { IChildrenProp, IElementProps } from 'types';

type IProps = IElementProps & IChildrenProp;

export default (props: IProps) => {
  return <div className={clsx(cl.body)}>{props.children}</div>;
};
