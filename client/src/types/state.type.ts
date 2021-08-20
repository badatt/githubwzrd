import { Dispatch } from 'redux';
import { Variants } from 'styled-minimal/lib/types';
import { AlertPosition, Icons } from './common.type';

import { UserState } from './user.type';

export interface AlertData {
  icon: Icons;
  id: string;
  message: string;
  position: AlertPosition;
  timeout: number;
  variant: Variants;
}

export interface AppState {
  alerts: AlertData[];
}

export interface StoreState {
  app: AppState;
  user: UserState;
}

export interface WithDispatch {
  dispatch: Dispatch;
}
