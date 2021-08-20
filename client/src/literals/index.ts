import { Status } from 'types';

export const STATUS: Status = {
  IDLE: 'idle',
  RUNNING: 'running',
  READY: 'ready',
  SUCCESS: 'success',
  ERROR: 'error',
};

export { default as AppActionTypes } from './app.literal';
export { default as UserActionTypes } from './user.literal';
export { default as SettingsActionTypes } from './settings.literal';
