import React from 'react';
import { IChildrenProp, IElementProps } from 'types';

type Props = IChildrenProp & IElementProps;

export const FooterMain = (props: Props) => {
  return <footer className="p-0 w-full h-16 mt-8">{props.children}</footer>;
};

export const Footer = (props: Props) => (
  <main className="container mx-auto flex flex-wrap items-center text-white align-middle text-center h-full justify-between">
    {props.children}
  </main>
);
