import React from 'react';
import { CheckCircleIcon, MinusCircle } from 'icons';
import cl from './UserRepos.module.scss';
import { IElementProps } from 'types';
import { Button } from 'components';

export const ReposSaveBtn = (props: IElementProps) => {
  return (
    <Button
      type="secondary"
      text="save"
      size="sm"
      icon={<CheckCircleIcon />}
      onClick={props.onClick}
    />
  );
};

export const LoadingButton = () => {
  return <Button text="save" loading />;
};

export const UserRepoName = (props: { name: string; onRemoveRepo?: (e: any) => void }) => {
  return (
    <div className={cl.userRepoName}>
      <Button iconOnly className={cl.repoRemoveBtn} onClick={props.onRemoveRepo}>
        <MinusCircle className={cl.repoRemoveIcon} />
      </Button>
      <span>{props.name}</span>
    </div>
  );
};
