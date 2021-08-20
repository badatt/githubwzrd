import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { useShallowEqualSelector } from 'modules/hooks';
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
          <HeaderView.Logo />
          <HeaderView.Navigation>
            {themeMode === 'light' ? (
              <HeaderView.ThemeSwitcher mode="light" switch={setThemeMode} />
            ) : (
              <HeaderView.ThemeSwitcher mode="dark" switch={setThemeMode} />
            )}
            <HeaderView.Settings />
            {isAvatarLoaded && (
              <HeaderView.UserDetail>
                <HeaderView.Avatar avatarUrl={data.avatarUrl} />
              </HeaderView.UserDetail>
            )}
          </HeaderView.Navigation>
        </HeaderView.Header>
        <HeaderView.Separator />
      </HeaderView.HeaderMain>
    </Fragment>
  );
};

export default Header;
