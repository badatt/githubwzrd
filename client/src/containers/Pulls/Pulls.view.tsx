import React, { Fragment } from 'react';
import { IRelatedPull } from 'types';
import cl from './Pulls.module.scss';

export const RelatePullData = (props: { relatedPull: IRelatedPull }): JSX.Element => {
  const { relatedPull } = props;
  return (
    <Fragment>
      {relatedPull.pulls?.map(p => {
        return <p key={p.title}>{p.title}</p>;
      })}
    </Fragment>
  );
};
