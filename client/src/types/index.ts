import { ReactChild, ReactPortal, Children } from 'react';
export * from './common.type';
export * from './state.type';

type Children = ReactChild | Array<Children> | ReactPortal;

export interface IElementProps {
  className?: string;
}

export interface IChildrenProp {
  children: Children;
}
