import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { useShallowEqualSelector } from 'modules/hooks';
import history from 'modules/history';
import { Routes } from 'literals';
import { getUser } from 'actions/user.action';
import * as HeaderView from './Header.view';
import { setDarkMode, setLightMode, currentMode } from 'styles/theme';
import { STATUS } from 'literals';

const Header: React.FC<{ currentThemeMode?: string }> = () => {
  const dispatch = useDispatch();
  const currentThemeMode: string = currentMode();
  const [themeMode, setThemeMode] = useState<string>(currentThemeMode);

  const { data, isAvatarLoaded } = useShallowEqualSelector(({ user }) => ({
    data: user.data,
    isAvatarLoaded: user.status === STATUS.SUCCESS,
  }));

  useMount(() => {
    dispatch(getUser());
  });

  useEffect(() => {
    if (themeMode === 'light') {
      setLightMode();
    } else {
      setDarkMode();
    }
  }, [themeMode]);

  return (
    <Fragment>
      <HeaderView.HeaderMain>
        <HeaderView.Header>
          <HeaderView.Logo onClick={() => history.push(Routes.HOME)} />
          <HeaderView.Navigation>
            {themeMode === 'light' ? (
              <HeaderView.ThemeSwitcher mode="light" switch={setThemeMode} />
            ) : (
              <HeaderView.ThemeSwitcher mode="dark" switch={setThemeMode} />
            )}
            <HeaderView.Settings onClick={() => history.push(Routes.SETTINGS)} />
            {isAvatarLoaded && <HeaderView.Avatar avatarUrl={data.avatarUrl} />}
          </HeaderView.Navigation>
        </HeaderView.Header>
        <HeaderView.Separator />
      </HeaderView.HeaderMain>
    </Fragment>
  );
};

export default Header;
