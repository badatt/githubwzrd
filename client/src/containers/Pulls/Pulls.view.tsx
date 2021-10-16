import React from 'react';
import clsx from 'clsx';
import { IError, IRelatedPull } from 'types';
import { STATUS } from 'literals';
import cl from './Pulls.module.scss';
import { Link, Card, CardHeader, CardBody, Loader, Box } from 'components';
import { ExternalLinkIcon, EyeIcon } from 'icons';

export const RelatedPullData = (props: {
  loadingStatus?: string;
  relatedPull?: IRelatedPull;
  error?: IError;
}): JSX.Element => {
  const { loadingStatus, relatedPull, error } = props;
  if (loadingStatus === STATUS.RUNNING) {
    return <Loader centered />;
  }
  if (loadingStatus === STATUS.ERROR) {
    return (
      <Box>
        <h5>{error?.message}</h5>
      </Box>
    );
  }
  return (
    <Card
      className={clsx(cl.repoCard)}
      styleName={clsx(relatedPull?.anyReviewRequiredByMe && cl.anyReviewRequiredByMe)}
    >
      <CardHeader goto={relatedPull?.repoUrl}>{relatedPull?.repoName}</CardHeader>
      <CardBody className={cl.repoCardBody}>
        <RelatedPull relatedPull={relatedPull} />
      </CardBody>
    </Card>
  );
};

export const RelatedPullActions = () => {
  return (
    <div className={cl.relatedPullActions}>
      <EyeIcon />
    </div>
  );
};

export const RelatedPull = (props: { relatedPull?: IRelatedPull }): JSX.Element => {
  const { relatedPull } = props;
  return (
    <div className={cl.relatedPull}>
      {relatedPull?.pulls?.map((p, i) => {
        return (
          <div key={i} className={clsx(cl.pull, p.reviewRequiredByMe && cl.reviewRequiredByMe)}>
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
