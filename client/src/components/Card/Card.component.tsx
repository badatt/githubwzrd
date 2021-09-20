import React from 'react';
import clsx from 'clsx';
import cl from './Card.module.scss';
import { IChildrenProp, IElementProps } from 'types';

export interface IProps {
  rounded?: boolean;
  styleName?: string;
}

export const Card = (props: IProps & IElementProps & IChildrenProp) => {
  const { className, styleName, rounded } = props;
  return (
    <section className={clsx(cl.wrap, className)}>
      <div className={clsx(cl.main, rounded && cl.rounded, styleName)}>{props.children}</div>
    </section>
  );
};

Card.defaultProps = {
  rounded: false,
};

export default Card;
