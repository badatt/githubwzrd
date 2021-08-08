import React, { FC, Fragment } from 'react';
import { IElementProps } from 'types';
import * as Styles from './styles';

type Props = IElementProps;

const Footer: FC<Props> = (props: Props) => {
  return (
    <Fragment>
      <Styles.FooterMain>
        <Styles.Footer>
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
        </Styles.Footer>
      </Styles.FooterMain>
    </Fragment>
  );
};

export default Footer;
