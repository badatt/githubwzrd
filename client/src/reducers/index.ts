import { reducer as formReducer } from 'redux-form';
import app, { appState } from './app.reducer';
import pulls, { pullsState } from './pulls.reducer';
import settings, { settingsState } from './settings.reducer';
import user, { userState } from './user.reducer';

export const initialState = {
  app: appState,
  pulls: pullsState,
  settings: settingsState,
  user: userState,
};

export default {
  form: formReducer,
  ...app,
  ...pulls,
  ...settings,
  ...user,
};
