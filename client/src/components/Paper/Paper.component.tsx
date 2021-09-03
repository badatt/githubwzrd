import React from 'react';
import clsx from 'clsx';
import { IChildrenProp, IElementProps } from 'types';
import cl from './Paper.module.scss';

type Props = IChildrenProp & IElementProps;

const Paper = (props: Props): JSX.Element => {
  return (
    <article component-name="Paper" className={clsx(cl.main, props.className)}>
      {props.children}
    </article>
  );
};

export default Paper;
