import React from 'react';
import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { useShallowEqualSelector } from 'modules/hooks';
import { PullsAction } from 'actions';

export default (): JSX.Element => {
  const dispatch = useDispatch();

  const { data } = useShallowEqualSelector(({ pulls }) => ({
    data: pulls.relatedPulls,
  }));

  console.log(data);

  useMount(() => {
    dispatch(PullsAction.getPulls());
  });
  return <div>Pulls container</div>;
};
