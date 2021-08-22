import { reducer as formReducer } from 'redux-form';
import app, { appState } from './app.reducer';
import user, { userState } from './user.reducer';
import settings, { settingsState } from './settings.reducer';

export const initialState = {
  app: appState,
  user: userState,
  settings: settingsState,
};

export default {
  form: formReducer,
  ...app,
  ...user,
  ...settings,
};
