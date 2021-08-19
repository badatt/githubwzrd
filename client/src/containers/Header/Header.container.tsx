import React, { Fragment, useState, useEffect } from 'react';
import * as HeaderView from './Header.view';
import { setDarkMode, setLightMode, currentMode } from 'styles/theme';

const Header: React.FC<{ currentThemeMode?: string }> = () => {
  const currentThemeMode: string = currentMode();
  const [themeMode, setThemeMode] = useState<string>(currentThemeMode);

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
            <HeaderView.Avatar />
          </HeaderView.Navigation>
        </HeaderView.Header>
        <HeaderView.Separator />
      </HeaderView.HeaderMain>
    </Fragment>
  );
};

export default Header;
