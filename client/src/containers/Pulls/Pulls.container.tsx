import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useShallowEqualSelector } from 'modules/hooks';
import { PullsAction } from 'actions';
import cl from './Pulls.module.scss';
import * as View from './Pulls.view';

export default (): JSX.Element => {
  const dispatch = useDispatch();

  const { repos, relatedPullData } = useShallowEqualSelector(({ pulls, user }) => ({
    repos: user.data.repos,
    relatedPullData: pulls.relatedPullData,
  }));

  useEffect(() => {
    repos?.forEach(r => {
      dispatch(PullsAction.getPull(r));
    });
  }, [repos]);

  console.log({ repoLen: repos?.length, count: relatedPullData?.length, relatedPullData });

  return (
    <div className={cl.main}>
      <div className={cl.header}></div>
      <div className={cl.content}>
        {relatedPullData?.map(rd => {
          return (
            <View.RelatedPullData
              key={rd.data?.repoName}
              loadingStatus={rd.status}
              relatedPull={rd.data}
              error={rd.error}
            />
          );
        })}
      </div>
    </div>
  );
};
