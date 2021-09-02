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

export const UserRepoName = (props: { name: string }) => {
  return (
    <div className={cl.userRepoName}>
      <button className={cl.repoRemoveBtn}>
        <MinusCircle className={cl.repoRemoveIcon} />
      </button>
      <span>{props.name}</span>
    </div>
  );
};
