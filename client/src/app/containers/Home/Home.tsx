import React from 'react';
import { RouteComponentProps } from 'react-router';
import 'app/styles/global.css';

export namespace HomeProps {
  export interface Props extends RouteComponentProps<void> {}
}

export const Home = ({ history, location }: HomeProps.Props) => {
  return (
    <div>
      <div className="text-blue-400 p-3">Hello, World!</div>
    </div>
  );
};
