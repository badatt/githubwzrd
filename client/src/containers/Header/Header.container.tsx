import React, { FC, Fragment } from 'react';
import { IElementProps } from 'types';
import * as Styles from './styles';

type Props = IElementProps;

const Header: FC<Props> = (props: Props) => {
  return (
    <Fragment>
      <Styles.HeaderMain>
        <Styles.Header>
          <Styles.Logo />
          <Styles.Navigation>
            <Styles.Settings />
            <Styles.Avatar />
          </Styles.Navigation>
        </Styles.Header>
      </Styles.HeaderMain>
    </Fragment>
  );
};

export default Header;
