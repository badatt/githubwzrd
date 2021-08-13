import React, { Fragment } from 'react';
import * as Styles from './styles';

const Header = () => {
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
