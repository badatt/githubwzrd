import { Dispatch } from 'redux';
import { Variants } from 'styled-minimal/lib/types';
import { AlertPosition, Icons } from './common.type';
import { IUserState } from './user.type';
import { ISettingsState } from './settings.type';
import { IPullsState } from './pulls.type';

export interface IAlertData {
  icon: Icons;
  id: string;
  message: string;
  position: AlertPosition;
  timeout: number;
  variant: Variants;
}

export interface IAppState {
  alerts: IAlertData[];
}

export interface IStoreState {
  form: {};
  app: IAppState;
  pulls: IPullsState;
  settings: ISettingsState;
  user: IUserState;
}

export interface WithDispatch {
  dispatch: Dispatch;
}
