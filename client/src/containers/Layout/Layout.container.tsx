import React, { FC, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { IChildrenProp, IElementProps } from 'types';
import Header from 'containers/Header/Header.container';
import Footer from 'containers/Footer/Footer.container';
import * as LayoutView from './Layout.view';

interface ILayOutProps {
  title?: string;
}

type Props = IChildrenProp & IElementProps & ILayOutProps;

const Layout: FC<Props> = (props: Props) => {
  return (
    <Fragment>
      <Helmet
        defaultTitle="Githubwzrd"
        title="Githubwzrd"
        defer={false}
        encodeSpecialCharacters
        htmlAttributes={{ lang: 'en-us' }}
        titleAttributes={{ itemprop: 'name', lang: 'en-us' }}
        titleTemplate={`${props.title} | %s`}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Header />
      <LayoutView.LayoutMain>{props.children}</LayoutView.LayoutMain>
      <Footer />
    </Fragment>
  );
};

Layout.defaultProps = {
  title: 'Githubwzrd',
};

export default Layout;
