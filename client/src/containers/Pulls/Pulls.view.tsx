import React from 'react';
import clsx from 'clsx';
import { IRelatedPull } from 'types';
import { STATUS } from 'literals';
import cl from './Pulls.module.scss';
import { Link, Card, CardHeader, CardBody, Loader } from 'components';
import { ExternalLinkIcon, EyeIcon } from 'icons';

export const RelatedPulls = (props: {
  loadingStatus?: string;
  relatedPulls?: IRelatedPull[];
}): JSX.Element => {
  const { loadingStatus, relatedPulls } = props;
  if (loadingStatus === STATUS.RUNNING) {
    return <Loader centered />;
  }
  return (
    <>
      {relatedPulls
        ?.filter(p => p.pulls!!.length > 0)
        .map((d, i) => {
          return (
            <Card
              key={i}
              className={clsx(cl.repoCard)}
              styleName={clsx(d.anyReviewRequiredByMe && cl.anyReviewRequiredByMe)}
            >
              <CardHeader goto={d.repoUrl}>{d.repoName}</CardHeader>
              <CardBody className={cl.repoCardBody}>
                <RelatedPull relatedPull={d} />
              </CardBody>
            </Card>
          );
        })}
    </>
  );
};

export const RelatedPullActions = () => {
  return (
    <div className={cl.relatedPullActions}>
      <EyeIcon />
    </div>
  );
};

export const RelatedPull = (props: { relatedPull: IRelatedPull }): JSX.Element => {
  const { relatedPull } = props;
  return (
    <div className={cl.relatedPull}>
      {relatedPull.pulls?.map((p, i) => {
        return (
          <div
            key={i}
            className={clsx(cl.pull, p.reviewRequiredByMe && cl.reviewRequiredByMe)}
          >
            <span className={cl.title}>{p.title}</span>
            <Link href={p.url}>
              <ExternalLinkIcon className={cl.linkIcon} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
