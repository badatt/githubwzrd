/* eslint-disable import/prefer-default-export */
import { shallowEqual, useSelector } from 'react-redux';

import { IStoreState } from 'types';

export function useShallowEqualSelector<TReturn>(selector: (state: IStoreState) => TReturn) {
  return useSelector(selector, shallowEqual);
}
