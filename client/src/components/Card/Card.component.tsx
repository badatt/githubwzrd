import React from 'react';
import clsx from 'clsx';
import cl from './Card.module.scss';
import { IChildrenProp, IElementProps } from 'types';

export interface IProps {}

export default (props: IProps & IElementProps & IChildrenProp) => {
  return (
    <section className={clsx(cl.wrap, props.className)}>
      <div className={clsx(cl.main)}>{props.children}</div>
    </section>
  );
};
