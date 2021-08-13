import React, { FC, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { IChildrenProp, IElementProps } from 'types';
import Header from 'containers/Header/Header.container';
import Footer from 'containers/Footer/Footer.container';
import * as Styles from './styles';

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
        htmlAttributes={{ lang: 'pt-br' }}
        titleAttributes={{ itemprop: 'name', lang: 'pt-br' }}
        titleTemplate={`${props.title} | %s`}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Header />
      <Styles.Main>{props.children}</Styles.Main>
      <Footer />
    </Fragment>
  );
};

Layout.defaultProps = {
  title: 'Githubwzrd',
};

export default Layout;
