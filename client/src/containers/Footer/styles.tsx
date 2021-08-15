import React from 'react';
import { IChildrenProp, IElementProps } from 'types';

type Props = IChildrenProp & IElementProps;

export const FooterMain = (props: Props) => {
  return (
    <footer className="flex justify-center flex-col p-0 w-full h-64 pt-4 text-gray-800 dark:text-gray-50 bg-gray-200 dark:bg-gray-800">
      <hr className="container w-full self-center border-gray-400 dark:border-gray-500 h-1" />
      {props.children}
    </footer>
  );
};

export const Footer = (props: Props) => (
  <main className="container mx-auto flex flex-wrap items-center align-middle text-center h-full justify-between">
    {props.children}
  </main>
);
