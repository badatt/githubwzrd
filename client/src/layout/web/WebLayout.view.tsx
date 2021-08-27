import React from 'react';
import { IChildrenProp, IElementProps } from 'types';
import classes from './WebLayout.module.css';

type Props = IChildrenProp & IElementProps;

export const LayoutMain = (props: Props) => {
  return <main className={classes['main']}>{props.children}</main>;
};

export const Layout = (props: Props) => {
  return <article className={classes['layout']}>{props.children}</article>;
};
