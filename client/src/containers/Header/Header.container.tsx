import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { useShallowEqualSelector } from 'modules/hooks';
import history from 'modules/history';
import { Routes } from 'literals';
import { getUser } from 'actions/user.action';
import * as HeaderView from './Header.view';
import { setDarkMode, setLightMode, currentTheme } from 'styles/theme';
import cl from './Header.module.scss';

const Header: React.FC<{ currentThemeMode?: string }> = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState<string>(currentTheme());

  const { data, getUserStatus } = useShallowEqualSelector(({ user }) => ({
    data: user?.data,
    getUserStatus: user.status,
  }));

  useMount(() => {
    dispatch(getUser());
  });

  useEffect(() => {
    if (theme === 'light') {
      setLightMode();
    } else {
      setDarkMode();
    }
  }, [theme]);

  return (
    <header className={cl.main}>
      <main className={cl.header}>
        <HeaderView.Logo onClick={() => history.push(Routes.HOME)} />
        <nav className={cl.navigation}>
          {theme === 'light' ? (
            <HeaderView.ThemeSwitcher mode="light" switch={setTheme} />
          ) : (
            <HeaderView.ThemeSwitcher mode="dark" switch={setTheme} />
          )}
          <HeaderView.Settings onClick={() => history.push(Routes.SETTINGS)} />
          <HeaderView.Avatar avatarUrl={data.avatarUrl} getUSerStatus={getUserStatus} />
        </nav>
      </main>
      <HeaderView.Separator />
    </header>
  );
};

export default Header;
