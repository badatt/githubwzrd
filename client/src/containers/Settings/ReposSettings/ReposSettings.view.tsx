import React from 'react';
import { IChildrenProp, IElementProps } from 'types';
import { Button, Paper } from 'components';
import { CheckCircleIcon } from 'icons';
import classes from './ReposSettings.module.css';

type Props = IChildrenProp & IElementProps;

export const ReposSettingsMain = (props: Props) => {
  return <Paper className={classes['main']}>{props.children}</Paper>;
};

export const ReposSaveBtn = () => {
  return <Button text="save" icon={<CheckCircleIcon />} />;
};
