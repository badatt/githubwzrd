import React, { Fragment, useState, useEffect } from 'react';
import * as Styles from './styles';
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
      <Styles.HeaderMain>
        <Styles.Header>
          <Styles.Logo />
          <Styles.Navigation>
            {themeMode === 'light' ? (
              <Styles.ThemeSwitcher mode="light" switch={setThemeMode} />
            ) : (
              <Styles.ThemeSwitcher mode="dark" switch={setThemeMode} />
            )}
            <Styles.Settings />
            <Styles.Avatar />
          </Styles.Navigation>
        </Styles.Header>
      </Styles.HeaderMain>
    </Fragment>
  );
};

export default Header;
