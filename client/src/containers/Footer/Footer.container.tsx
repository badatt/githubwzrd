import React, { Fragment } from 'react';
import * as FooterView from './Footer.view';

const Footer = () => {
  return (
    <Fragment>
      <FooterView.FooterMain>
        <FooterView.Footer>
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
        </FooterView.Footer>
      </FooterView.FooterMain>
    </Fragment>
  );
};

export default Footer;
