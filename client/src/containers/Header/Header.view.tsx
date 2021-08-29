import React, { Fragment } from 'react';
import { IChildrenProp, IElementProps } from 'types';
import { GearIcon, MoonIcon, RotatingCircleIcon, SunIcon } from 'icons';
import classes from './Header.module.css';
import { Image } from 'components';
import { STATUS } from 'literals';

type Props = IChildrenProp & IElementProps;

export const HeaderMain = (props: Props) => {
  return <header className={classes['main']}>{props.children}</header>;
};

export const Header = (props: Props) => <main className={classes['header']}>{props.children}</main>;

export const Separator = () => <hr className={classes['separator']} />;

export const Logo = (props: IElementProps) => (
  <div className={classes['logo']} onClick={props.onClick}>
    Githubwzrd
  </div>
);

export const Navigation = (props: Props) => (
  <nav className={classes['navigation']}>{props.children}</nav>
);

export interface IThemeSwitcherProps {
  mode: string;
  switch: (mode: string) => void;
}

export const ThemeSwitcher = (props: IThemeSwitcherProps) => (
  <Fragment>
    {props.mode === 'light' ? (
      <button className={classes['action-btn']} onClick={() => props.switch('dark')}>
        <MoonIcon className={classes['action-icon']} />
      </button>
    ) : (
      <button className={classes['action-btn']} onClick={() => props.switch('light')}>
        <SunIcon className={classes['action-icon']} />
      </button>
    )}
  </Fragment>
);

export const Settings = (props: IElementProps) => (
  <button className={classes['action-btn']} onClick={props.onClick}>
    <GearIcon className={classes['action-icon']} />
  </button>
);

export const Avatar = (props: { avatarUrl?: string; getUSerStatus: string }) => (
  <div className={classes['avatar']}>
    {props.getUSerStatus === STATUS.RUNNING ? (
      <RotatingCircleIcon />
    ) : (
      <Image src={props.avatarUrl} rounded />
    )}
  </div>
);
