import { IStatus } from 'types';
export { default as AppActionTypes } from './app.literal';
export { default as UserActionTypes } from './user.literal';
export { default as SettingsActionTypes } from './settings.literal';

export const STATUS: IStatus = {
  IDLE: 'idle',
  RUNNING: 'running',
  READY: 'ready',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const Routes = {
  HOME: '/',
  SETTINGS: '/settings',
};
