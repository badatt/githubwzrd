import React from 'react';
import { IChildrenProp, IElementProps } from 'types';

type Props = IChildrenProp & IElementProps;

export const Main = (props: Props) => {
  return <main className="mt-16 bg-gray-200">{props.children}</main>;
};
