import { ReactChild, ReactPortal, Children, ReactText } from 'react';
export * from './common.type';
export * from './state.type';

type Children = ReactChild | Array<Children> | ReactPortal | Boolean;

export interface IElementProps {
  className?: string;
}

export interface IChildrenProp {
  children: Children;
}

export interface ITextChildProp {
  children: ReactText;
}
