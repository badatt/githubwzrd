import React from 'react';
import { RouteComponentProps } from 'react-router';
import 'app/styles/global.css';

export namespace HomeProps {
  export interface Props extends RouteComponentProps<void> {}
}

export const Home = ({ history, location }: HomeProps.Props) => {
  return (
    <div>
      Home <button className="p-3">Submit</button>
    </div>
  );
};
