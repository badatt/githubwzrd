import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { useShallowEqualSelector } from 'modules/hooks';
import history from 'modules/history';
import { Routes, STATUS } from 'literals';
import { getUser } from 'actions/user.action';
import * as HeaderView from './Header.view';
import { setDarkMode, setLightMode, currentTheme } from 'styles/theme';

const Header: React.FC<{ currentThemeMode?: string }> = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState<string>(currentTheme());

  const { data, isAvatarLoaded } = useShallowEqualSelector(({ user }) => ({
    data: user?.data,
    isAvatarLoaded: user.status === STATUS.SUCCESS,
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
    <Fragment>
      <HeaderView.HeaderMain>
        <HeaderView.Header>
          <HeaderView.Logo onClick={() => history.push(Routes.HOME)} />
          <HeaderView.Navigation>
            {theme === 'light' ? (
              <HeaderView.ThemeSwitcher mode="light" switch={setTheme} />
            ) : (
              <HeaderView.ThemeSwitcher mode="dark" switch={setTheme} />
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
