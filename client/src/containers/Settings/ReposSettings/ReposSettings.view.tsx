import React from 'react';
import { IChildrenProp, IElementProps } from 'types';
import { Button, Paper } from 'components';
import { CheckCircleIcon } from 'icons';
import classes from './ReposSettings.module.css';
import Table, { ITableData } from 'components/Table/Table.component';

type Props = IChildrenProp & IElementProps;

export const ReposSettingsMain = (props: Props) => {
  return <Paper className={classes['main']}>{props.children}</Paper>;
};

export const ReposSaveBtn = () => {
  return <Button text="save" icon={<CheckCircleIcon />} />;
};

export const ReposTable = (props: ITableData) => {
  return <Table columns={props?.columns} rows={props?.rows} />;
};
