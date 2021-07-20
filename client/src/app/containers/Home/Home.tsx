import React from 'react';
import { RouteComponentProps } from 'react-router';
import 'app/styles/global.css';
import * as Styled from './styles';

export namespace HomeProps {
  export interface Props extends RouteComponentProps<void> {}
}

export const Home = ({ history, location }: HomeProps.Props) => {
  return (
    <div>
      <Styled.H1>This is the entry point for the application</Styled.H1>
    </div>
  );
};
