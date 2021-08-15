import React, { Fragment } from 'react';
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

export interface IThemeSwitcherProps {
  mode: string;
  switch: (mode: string) => void;
}

export const ThemeSwitcher = (props: IThemeSwitcherProps) => (
  <Fragment>
    {props.mode === 'light' ? (
      <button
        className="h-10 w-10 flex justify-center items-center focus:outline-none"
        onClick={() => props.switch('dark')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </button>
    ) : (
      <button
        className="h-10 w-10 flex justify-center items-center focus:outline-none"
        onClick={() => props.switch('light')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    )}
  </Fragment>
);

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
