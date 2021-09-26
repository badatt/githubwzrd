import { REHYDRATE } from 'redux-persist';

import { createReducer } from 'modules/helpers';

import { AppActionTypes } from 'literals';

import { IAppState } from 'types';

export const appState: IAppState = {
  alerts: [],
};

export default {
  app: createReducer<IAppState>(
    {
      [REHYDRATE]: draft => {
        draft.alerts = [];
      },
      [AppActionTypes.HIDE_ALERT]: (draft, { payload: { id } }) => {
        draft.alerts = draft.alerts.filter(d => d.id !== id);
      },
      [AppActionTypes.SHOW_ALERT]: (draft, { payload }) => {
        draft.alerts.push(payload);
      },
    },
    appState,
  ),
};
