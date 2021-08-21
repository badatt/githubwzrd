import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { IChildrenProp, IElementProps } from 'types';

interface IPageProps {
  title?: string;
}

type Props = IChildrenProp & IElementProps & IPageProps;

const Page = (props: Props) => {
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
      {props.children}
    </Fragment>
  );
};

Page.defaultProps = {
  title: 'Githubwzrd',
};

export default Page;
