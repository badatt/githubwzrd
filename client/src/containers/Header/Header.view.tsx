import React, { Fragment } from 'react';
import { IElementProps } from 'types';
import { GearIcon, MoonIcon, RotatingCircleIcon, SunIcon } from 'icons';
import cl from './Header.module.scss';
import { Image } from 'components';
import { STATUS } from 'literals';

export const Separator = () => <hr className={cl.separator} />;

export const Logo = (props: IElementProps) => (
  <div className={cl.logo} onClick={props.onClick}>
    Githubwzrd
  </div>
);

export interface IThemeSwitcherProps {
  mode: string;
  switch: (mode: string) => void;
}

export const ThemeSwitcher = (props: IThemeSwitcherProps) => (
  <Fragment>
    {props.mode === 'light' ? (
      <button className={cl.actionBtn} onClick={() => props.switch('dark')}>
        <MoonIcon className={cl.actionIcon} />
      </button>
    ) : (
      <button className={cl.actionBtn} onClick={() => props.switch('light')}>
        <SunIcon className={cl.actionIcon} />
      </button>
    )}
  </Fragment>
);

export const Settings = (props: IElementProps) => (
  <button className={cl.actionBtn} onClick={props.onClick}>
    <GearIcon className={cl.actionIcon} />
  </button>
);

export const Avatar = (props: { avatarUrl?: string; getUSerStatus: string }) => (
  <div className={cl.avatar}>
    {props.getUSerStatus === STATUS.RUNNING ? (
      <RotatingCircleIcon />
    ) : (
      <Image src={props.avatarUrl} rounded />
    )}
  </div>
);
