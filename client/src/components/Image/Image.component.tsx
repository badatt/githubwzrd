import React, { FC } from 'react';
import clsx from 'clsx';
import { IElementProps } from 'types';
import classes from './Image.module.css';

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
      className={clsx(classes['main'], props.rounded && classes['rounded'], props.className)}
      alt={props.alt}
    />
  );
};

Image.defaultProps = {
  rounded: false,
};

export default Image;
