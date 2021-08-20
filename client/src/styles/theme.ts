// On page load or when changing themes, best to add inline in `head` to avoid FOUC

export const setDarkMode = () => {
  localStorage.theme = 'dark';
  setTheme();
};

export const setLightMode = () => {
  localStorage.theme = 'light';
  setTheme();
};

export const currentMode = (): string => {
  return localStorage.theme || 'light';
};

export const reset = () => {
  localStorage.removeItem('theme');
};

const setTheme = () => {
  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

setTheme();
