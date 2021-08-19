import React from 'react';
import { IChildrenProp, IElementProps } from 'types';
import classes from './Layout.module.css';

type Props = IChildrenProp & IElementProps;

export const Main = (props: Props) => {
  return <main className={classes['main']}>{props.children}</main>;
};
