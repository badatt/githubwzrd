import React from 'react';
import { useShallowEqualSelector } from 'modules/hooks';
import history from 'modules/history';
import { Routes } from 'literals';
import * as View from './Header.view';
import cl from './Header.module.scss';
import ThemeSwitcher from 'containers/ThemeSwitcher/ThemeSwitcher.container';

export default () => {
  const { data, getUserStatus } = useShallowEqualSelector(({ user }) => ({
    data: user?.data,
    getUserStatus: user.status,
  }));

  return (
    <header className={cl.main}>
      <main className={cl.header}>
        <View.Logo onClick={() => history.push(Routes.HOME)} />
        <nav className={cl.navigation}>
          <ThemeSwitcher />
          <View.Settings onClick={() => history.push(Routes.SETTINGS)} />
          <View.Avatar avatarUrl={data.avatarUrl} getUSerStatus={getUserStatus} />
        </nav>
      </main>
      <View.Separator />
    </header>
  );
};
