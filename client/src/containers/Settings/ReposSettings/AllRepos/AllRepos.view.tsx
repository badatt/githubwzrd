import React from 'react';
import { CheckCircleIcon, PlusCircleIcon } from 'icons';
import cl from './AllRepos.module.scss';
import { IElementProps } from 'types';
import { Button } from 'components';

export interface IReposAddBtn {
  isAddedAlready?: boolean;
}

export const ReposAddBtn = (props: IReposAddBtn & IElementProps) => {
  return (
    <Button iconOnly className={cl.repoAddBtn} disabled={props.disabled} onClick={props.onClick}>
      {props.isAddedAlready ? (
        <CheckCircleIcon className={cl.repoAddedBtnIcon} />
      ) : (
        <PlusCircleIcon className={cl.repoAddBtnIcon} />
      )}
    </Button>
  );
};

export const NextBtn = (props: IElementProps) => {
  return <Button size="sm" text="next" disabled={props.disabled} onClick={props.onClick} />;
};

export const PreviousBtn = (props: IElementProps) => {
  return <Button size="sm" text="previous" disabled={props.disabled} onClick={props.onClick} />;
};
