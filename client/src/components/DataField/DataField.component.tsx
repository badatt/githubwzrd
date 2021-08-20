import React from 'react';
import { IElementProps } from 'types';
import classes from './DataField.module.css';

interface IDataField {
  label?: string;
  value?: string;
}

type Props = IDataField & IElementProps;

const DataField = (props: Props): JSX.Element => {
  return (
    <dl className={classes['main']}>
      <dd className={classes['label']}>{props.label}</dd>
      <dt className={classes['value']}>{props.value}</dt>
    </dl>
  );
};

export default DataField;
