import React from 'react';
import clsx from 'clsx';
import cl from './Accordion.module.scss';
import { IChildrenProp, IElementProps } from 'types';

export interface IProps {
  expanded?: boolean;
}

export default (props: IProps & IElementProps & IChildrenProp) => {
  return <div className={clsx(cl.main)}>{props.children}</div>;
};
