import React from 'react';
import { IChildrenProp, IElementProps } from 'types';
import classes from './Footer.module.css';

type Props = IChildrenProp & IElementProps;

export const FooterMain = (props: Props) => {
  return (
    <footer className={classes['main']}>
      <hr className={classes['separator']} />
      {props.children}
    </footer>
  );
};

export const Footer = (props: Props) => <main className={classes['footer']}>{props.children}</main>;
