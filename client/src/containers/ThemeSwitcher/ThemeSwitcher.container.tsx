import React, { Fragment, useEffect, useState } from 'react';
import { Button } from 'components';
import { setDarkMode, setLightMode, currentTheme } from 'styles/theme';
import { MoonIcon, SunIcon } from 'icons';
import cl from './ThemeSwitcher.module.scss';

export interface IThemeSwitcherProps {
  mode: string;
  switch: (mode: string) => void;
}

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<string>(currentTheme());
  useEffect(() => {
    if (theme === 'light') {
      setLightMode();
    } else {
      setDarkMode();
    }
  }, [theme]);
  return (
    <Fragment>
      {theme === 'light' ? (
        <Button iconOnly onClick={() => setTheme('dark')} className={cl.actionBtn}>
          <MoonIcon className={cl.actionIcon} />
        </Button>
      ) : (
        <Button iconOnly onClick={() => setTheme('light')} className={cl.actionBtn}>
          <SunIcon className={cl.actionIcon} />
        </Button>
      )}
    </Fragment>
  );
};

export default ThemeSwitcher;
