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
    <div className={clsx(cl.title)}>
      <div className={cl.titleMain}>{props.children}</div>
      <div className={cl.titleAction}>
        <Button iconOnly onClick={props.onExpandItem}>
          <ChevronDownIcon className={cl.titleActionIcon} />
        </Button>
      </div>
    </div>
  );
};
