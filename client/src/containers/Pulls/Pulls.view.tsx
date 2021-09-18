import React, { Fragment } from 'react';
import { IRelatedPullData } from 'types';
import cl from './Pulls.module.scss';

export const RepoTitle = (props: { title?: string }) => {
  return <h3 className={cl.repoTitle}>{props.title}</h3>;
};

export const RelatePullData = (props: { relatedPullData: IRelatedPullData }) => {
  const { relatedPullData } = props;
  return (
    <Fragment>
      {relatedPullData.pulls?.map(p => {
        return <p key={p.title}>{p.title}</p>;
      })}
    </Fragment>
  );
};
