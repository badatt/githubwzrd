import React from 'react';
import clsx from 'clsx';
import cl from './Card.module.scss';
import { IChildrenProp, IElementProps } from 'types';
import Link from 'components/Link/Link.component';
import { ExternalLinkIcon } from 'icons';

export interface IProps {
  goto?: string;
}

export default (props: IProps & IElementProps & IChildrenProp) => {
  const { goto } = props;
  return (
    <div className={clsx(cl.header, props.className)}>
      <div className={cl.content}>{props.children}</div>
      {goto && (
        <Link href={goto} className={cl.gotoLink}>
          <ExternalLinkIcon className={cl.gotoLinkIcon} />
        </Link>
      )}
    </div>
  );
};
