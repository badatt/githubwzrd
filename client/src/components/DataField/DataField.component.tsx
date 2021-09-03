import React from 'react';
import clsx from 'clsx';
import { IElementProps } from 'types';
import cl from './DataField.module.scss';

interface IDataField {
  label?: string;
  value?: string;
}

type Props = IDataField & IElementProps;

const DataField = (props: Props): JSX.Element => {
  return (
    <dl className={clsx(cl.main, props.className)} component-name="DataField">
      <dd className={cl.label}>{props.label}</dd>
      <dt className={cl.value}>{props.value}</dt>
    </dl>
  );
};

export default DataField;
