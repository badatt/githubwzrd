import app, { appState } from './app.reducer';
import user, { userState } from './user.reducer';

export const initialState = {
  app: appState,
  user: userState,
};

export default {
  ...app,
  ...user,
};
