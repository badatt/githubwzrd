import React from 'react';
import clsx from 'clsx';
import { ChevronDownIcon, ChevronUpIcon } from 'icons';
import cl from './Accordion.module.scss';
import { IChildrenProp, IElementProps } from 'types';

type IProps = IElementProps & IChildrenProp;

export default (props: IProps) => {
  return (
    <div className={clsx(cl.title)}>
      <div className={cl.titleMain}>{props.children}</div>
      <div className={cl.titleAction}>
        <ChevronDownIcon className={clsx(cl.titleActionIcon, cl.titleActionIconDown)} />
        <ChevronUpIcon className={clsx(cl.titleActionIcon, cl.titleActionIconUp)} />
      </div>
    </div>
  );
};
