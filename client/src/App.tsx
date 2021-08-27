import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ErrorHandler } from 'containers';
import { Loader } from 'components';
import { WebLayout } from 'layout';
import './styles/global.css';

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
            <WebLayout />
          </HelmetProvider>
        </ErrorHandler>
      </PersistGate>
    </Provider>
  );
}

export default App;
