import React from 'react';

export interface IActionCreator<P extends any[] = any[], A = any> {
  (...args: P): IStoreAction<A>;
}

export interface IActionsMapReducer<State> {
  [type: string]: (draft: State, action: IStoreAction) => any;
}

export type AlertPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface IAsyncFlow {
  message: string;
  status: IStatus;
}

export type GenericFunction<T = any> = (...args: any[]) => T;

export type Icons =
  | 'bell-o'
  | 'bell'
  | 'bolt'
  | 'check-circle-o'
  | 'check-circle'
  | 'check'
  | 'dot-circle-o'
  | 'exclamation-circle'
  | 'question-circle-o'
  | 'question-circle'
  | 'sign-in'
  | 'sign-out'
  | 'times-circle-o'
  | 'times-circle'
  | 'times';

export type PlainObject<T = any> = Record<string, T>;

export interface IRouteProps {
  component: React.ComponentType<any>;
  exact?: boolean;
  isAuthenticated: boolean;
  path: string;
  to?: string;
}

export interface IStatus {
  ERROR: 'error';
  IDLE: 'idle';
  READY: 'ready';
  RUNNING: 'running';
  SUCCESS: 'success';
}

export interface IStoreAction<T = any> {
  error?: boolean;
  meta?: PlainObject;
  payload?: T;
  type: string;
}

export interface IShowAlertOptions {
  icon?: Icons;
  id?: string;
  position?: AlertPosition;
  timeout?: number;
  variant?: string;
}

export type Transitions = 'fade' | 'slideDown' | 'slideLeft' | 'slideRight' | 'slideUp';

export interface IError {
  code?: number;
  title?: string;
  message?: string;
  detail?: any;
}

export interface IReposPageInfo {
  endCursor?: string;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  startCursor?: string;
}

export interface IRateLimit {
  cost?: number;
  limit?: number;
  remaining?: number;
  resetAt?: string;
}
