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

  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onExpandItem: handleExpandItem });
    }
    return child;
  });

  return <section className={clsx(cl.item, expanded && cl.expanded)}>{childrenWithProps}</section>;
};
