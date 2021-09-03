import React from 'react';
import { IChildrenProp, IElementProps } from 'types';
import { DataField } from 'components';
import { IUserData } from 'types/user.type';
import classes from './AccountSettings.module.css';

type Props = IChildrenProp & IElementProps;

export const Details = (props: IUserData) => {
  return (
    <section className={classes['main']}>
      <div className={classes['text-details']}>
        <DataField label="name" value={props.name} />
        <DataField label="organisation" value={props.org} />
      </div>
      <div className={classes['avatar']}>
        <img src={props.avatarUrl} />
      </div>
    </section>
  );
};

export const Note = (props: Props) => {
  return <p className={classes['note']}>{props.children}</p>;
};
