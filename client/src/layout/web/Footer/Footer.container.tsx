import React, { Fragment } from 'react';
import cl from './Footer.module.scss';

export default () => {
  return (
    <Fragment>
      <footer className={cl.main}>
        <hr className={cl.separator} />
        <main className={cl.footer}></main>
      </footer>
    </Fragment>
  );
};
