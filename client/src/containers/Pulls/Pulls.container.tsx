import React from 'react';
import { useDispatch } from 'react-redux';
import { useMount } from 'react-use';
import { useShallowEqualSelector } from 'modules/hooks';
import { PullsAction } from 'actions';
import { Card, CardHeader, CardBody, Loader } from 'components';
import cl from './Pulls.module.scss';
import { STATUS } from 'literals';
import * as View from './Pulls.view';

export default (): JSX.Element => {
  const dispatch = useDispatch();

  const { data, isLoading } = useShallowEqualSelector(({ pulls }) => ({
    data: pulls.relatedPullData?.data,
    isLoading: pulls.loadingPullsStatus,
  }));

  useMount(() => {
    dispatch(PullsAction.getPulls());
  });

  return (
    <div className={cl.main}>
      <div className={cl.header}></div>
      <div className={cl.content}>
        {isLoading === STATUS.RUNNING && <Loader centered />}
        {isLoading === STATUS.SUCCESS &&
          data
            ?.filter(p => p.pulls!!.length > 0)
            .map(d => {
              return (
                <Card key={d.repoName} className={cl.repoCard}>
                  <CardHeader goto={d.repoUrl}>{d.repoName}</CardHeader>
                  <CardBody className={cl.repoCardBody}>
                    <View.RelatePullData relatedPull={d} />
                  </CardBody>
                </Card>
              );
            })}
      </div>
    </div>
  );
};
