import React from 'react';
import { IChildrenProp, IElementProps } from 'types';

type Props = IChildrenProp & IElementProps;

export const HeaderMain = (props: Props) => {
  return (
    <header className="bg-green-600 p-0 mt-0 fixed w-full z-10 top-0 h-16">{props.children}</header>
  );
};

export const Header = (props: Props) => (
  <main className="container mx-auto flex flex-wrap items-center text-white align-middle text-center h-full justify-between">
    {props.children}
  </main>
);

export const Logo = () => <div className="text-3xl font-thin">Githubwzrd</div>;

export const Navigation = (props: Props) => <nav className="flex space-x-10">{props.children}</nav>;

export const Settings = () => (
  <button className="h-12">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  </button>
);

export const Avatar = () => (
  <button className="h-12">
    <img
      src="https://avatars.githubusercontent.com/u/43672979?s=60&v=4"
      className="h-10 w-10 rounded-full"
    />
  </button>
);
