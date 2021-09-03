import React, { Fragment } from 'react';
import cl from './Footer.module.scss';

const Footer = () => {
  return (
    <Fragment>
      <footer className={cl.main}>
        <hr className={cl.separator} />
        <main className={cl.footer}>
          <iframe
            frameBorder="0"
            height="20px"
            scrolling="0"
            src="https://ghbtns.com/github-btn.html?user=badatt&repo=githubwzrd&type=star&count=true"
            title="GitHub Stars"
            width="110px"
          />
          <iframe
            frameBorder="0"
            height="20px"
            scrolling="0"
            src="https://ghbtns.com/github-btn.html?user=badatt&type=follow&count=true"
            title="GitHub Follow"
            width="130px"
          />
        </main>
      </footer>
    </Fragment>
  );
};

export default Footer;
