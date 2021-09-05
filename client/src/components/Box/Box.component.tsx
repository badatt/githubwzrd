import React from 'react';
import clsx from 'clsx';
import { IChildrenProp, IElementProps } from 'types';
import cl from './Box.module.scss';

export interface IBox {
  centered?: boolean;
  middle?: boolean;
}

const Box = (props: IBox & IElementProps & IChildrenProp): JSX.Element => {
  return (
    <div
      className={clsx(
        cl.main,
        props.centered && cl.centered,
        props.middle && cl.middle,
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};

Box.defaultProps = {
  centered: true,
  middle: true,
};

export default Box;
