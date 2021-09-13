import React, { useState } from 'react';
import clsx from 'clsx';
import cl from './Accordion.module.scss';
import { IChildrenProp, IElementProps } from 'types';

export interface IProps {
  expanded?: boolean;
}

export default (props: IProps & IElementProps & IChildrenProp) => {
  const [expanded, setExpanded] = useState<boolean>(props.expanded || false);

  const handleExpandItem = () => {
    setExpanded(!expanded);
  };

  return (
    <section className={clsx(cl.item, expanded && cl.expanded)} onClick={handleExpandItem}>
      {props.children}
    </section>
  );
};
