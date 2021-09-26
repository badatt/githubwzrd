import React, { FC } from 'react';
import clsx from 'clsx';
import { IElementProps } from 'types';
import cl from './Image.module.scss';

export interface IProps {
  src?: string;
  alt?: string;
  rounded?: boolean;
}

type Props = IElementProps & IProps;

const Image: FC<IProps> = (props: Props) => {
  return (
    <img
      component-name="Image"
      src={props.src}
      className={clsx(props.rounded && cl.rounded, props.className)}
      alt={props.alt}
    />
  );
};

Image.defaultProps = {
  rounded: false,
};

export default Image;
