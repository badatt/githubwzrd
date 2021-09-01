import React from 'react';
import { IChildrenProp, IElementProps } from 'types';
import { Button } from 'components';
import { CheckCircleIcon, MinusCircle, PlusCircleIcon } from 'icons';
import classes from './ReposSettings.module.css';
import Table, { ITableData } from 'components/Table/Table.component';

type Props = IChildrenProp & IElementProps;

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

export const ReposTable = (props: ITableData) => {
  return <Table columns={props?.columns} rows={props?.rows} />;
};

export const RepoAddBtn = () => {
  return (
    <button className={classes['repo-add-btn']}>
      <PlusCircleIcon className={classes['repo-add-icon']} />
    </button>
  );
};

export const UserRepoName = (props: { name: string }) => {
  return (
    <div className={classes['user-repo-name']}>
      <button className={classes['repo-remove-btn']}>
        <MinusCircle className={classes['repo-remove-icon']} />
      </button>
      <span>{props.name}</span>
    </div>
  );
};
