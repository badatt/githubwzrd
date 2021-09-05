import { now } from '@gilbarbara/helpers';
import produce from 'immer';
import { Reducer } from 'redux';

import { IActionCreator, IActionsMapReducer, GenericFunction, IStoreAction } from 'types';

/**
 * Create an action
 */
export function createAction<T extends GenericFunction>(
  type: string,
  payloadCreator: T,
): IActionCreator<Parameters<T>, ReturnType<T>> {
  if (!payloadCreator) {
    throw new TypeError('Expected a function');
  }

  return (...args: any[]) => ({
    type,
    payload: payloadCreator(...args),
  });
}

/**
 * Create a reducer
 */
export function createReducer<State>(
  actionsMap: IActionsMapReducer<State>,
  defaultState: State,
): Reducer<State, IStoreAction> {
  return (state = defaultState, action: IStoreAction) =>
    produce(state, (draft: State) => {
      const fn = actionsMap[action.type];

      if (fn) {
        return fn(draft, action);
      }

      return draft;
    });
}

/**
 * Check if cache is valid
 */
export function hasValidCache(lastUpdated: number, max = 10): boolean {
  if (!navigator.onLine) {
    return true;
  }

  return lastUpdated + max * 60 > now();
}
