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
    data: pulls.relatedPulls?.data,
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
          data?.map(d => {
            return (
              <Card key={d.repoName} className={cl.repoCard}>
                <CardHeader goto={d.repoUrl}>{d.repoName}</CardHeader>
                <CardBody>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam rem, suscipit
                  debitis et quis mollitia, eum delectus eaque velit repellat nesciunt itaque.
                  Repellat omnis non et voluptatem fugit. Vero, velit! Odio nostrum dolores nobis
                  molestias omnis quos vitae veniam eius, doloribus, officiis libero ullam dicta,
                  totam saepe itaque? Accusamus repellat quos rerum! Perferendis veniam ratione
                  vitae blanditiis aperiam nisi porro.
                </CardBody>
              </Card>
            );
          })}
      </div>
    </div>
  );
};
