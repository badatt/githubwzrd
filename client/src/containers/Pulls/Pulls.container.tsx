import React from 'react';
import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { useShallowEqualSelector } from 'modules/hooks';
import { PullsAction } from 'actions';
import cl from './Pulls.module.scss';
import * as View from './Pulls.view';

export default (): JSX.Element => {
  const dispatch = useDispatch();

  const { data, loadingStatus } = useShallowEqualSelector(({ pulls }) => ({
    data: pulls.relatedPullData?.data,
    loadingStatus: pulls.loadingPullsStatus,
  }));

  useMount(() => {
    dispatch(PullsAction.getPulls());
  });

  return (
    <div className={cl.main}>
      <div className={cl.header}></div>
      <div className={cl.content}>
        <View.RelatedPulls loadingStatus={loadingStatus} relatedPulls={data} />
      </div>
    </div>
  );
};
