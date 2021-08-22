import React from 'react';

import './styles/global.css';

import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import LayoutContainer from 'containers/Layout/Layout.container';
import { Loader } from 'components';
import ErrorHandler from 'containers/ErrorHandler';

interface IAppProps {
  store: any;
  persistor: any;
}

function App(props: IAppProps) {
  return (
    <Provider store={props.store}>
      <PersistGate loading={<Loader block />} persistor={props.persistor}>
        <ErrorHandler>
          <HelmetProvider>
            <LayoutContainer />
          </HelmetProvider>
        </ErrorHandler>
      </PersistGate>
    </Provider>
  );
}

export default App;
