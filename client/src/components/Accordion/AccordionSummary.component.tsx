import React from 'react';
import clsx from 'clsx';
import { ChevronDownIcon } from 'icons';
import cl from './Accordion.module.scss';
import { IChildrenProp, IElementProps } from 'types';
import Button from 'components/Button/Button.component';

export interface IProps {
  onExpandItem?: () => void;
}

export default (props: IProps & IElementProps & IChildrenProp) => {
  return (
    <div className={clsx(cl.summary)}>
      <div className={cl.summaryMain}>{props.children}</div>
      <div className={cl.summaryAction}>
        <Button iconOnly onClick={props.onExpandItem}>
          <ChevronDownIcon className={cl.summaryActionIcon} />
        </Button>
      </div>
    </div>
  );
};
