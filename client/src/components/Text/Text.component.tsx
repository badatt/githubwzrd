import React from 'react';
import clsx from 'clsx';
import cl from './Text.module.scss';
import { IElementProps, ITextChildProp } from 'types';

export interface IText {
  as?:
    | 'hero'
    | 'title1'
    | 'title2'
    | 'subtitle1'
    | 'subtitle2'
    | 'caption'
    | 'body1'
    | 'body2'
    | 'code'
    | 'span'
    | 'p'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6';
  type?: 'primary' | 'secondary' | 'danger' | 'success' | 'neutral';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  icon?: JSX.Element;
  b?: boolean;
  u?: boolean;
  i?: boolean;
  uc?: boolean;
  lc?: boolean;
  cc?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  centered?: boolean;
  truncate?: boolean;
}

const Text = (props: IText & IElementProps & ITextChildProp): JSX.Element => {
  const Component = (p: IElementProps & ITextChildProp) => {
    switch (props.as) {
      case 'h1':
      case 'hero':
        return <h1 className={p.className}>{p.children}</h1>;
      case 'h2':
      case 'title1':
        return <h2 className={p.className}>{p.children}</h2>;
      case 'h3':
      case 'title2':
        return <h3 className={p.className}>{p.children}</h3>;
      case 'h4':
      case 'subtitle1':
        return <h4 className={p.className}>{p.children}</h4>;
      case 'h5':
      case 'subtitle2':
        return <h5 className={p.className}>{p.children}</h5>;
      case 'h6':
        return <h6 className={p.className}>{p.children}</h6>;
      case 'p':
      case 'body1':
      case 'body2':
        return <p className={p.className}>{p.children}</p>;
      case 'span':
        return <span className={p.className}>{p.children}</span>;
      case 'code':
        return <code className={p.className}>{p.children}</code>;
      default:
        return <span className={p.className}>{p.children}</span>;
    }
  };

  const classes = clsx(
    cl[props.as || 'span'],
    cl[props.type || 'neutral'],
    cl[props.size || 'md'],
    props.b && cl.b,
    props.i && cl.i,
    props.u && cl.u,
    props.uc && cl.uc,
    props.lc && cl.lc,
    props.cc && cl.cc,
    props.disabled && cl.disabled,
    props.fullWidth && cl.fullWidth,
    props.centered && cl.centered,
    props.truncate && cl.trunc,
  );

  return <Component className={classes}>{props.children}</Component>;
};

Text.defaultProps = {
  type: 'neutral',
  size: 'md',
};

export default Text;
