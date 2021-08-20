import React from 'react';
import { IChildrenProp, IElementProps } from 'types';
import classes from './Paper.module.css';

type Props = IChildrenProp & IElementProps;

const Paper = (props: Props): JSX.Element => {
  return <article className={classes['main']}>{props.children}</article>;
};

export default Paper;
