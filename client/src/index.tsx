import React from 'react';
import ReactDOM from 'react-dom';
import { showAlert } from 'actions/app.action';
import Reload from 'components/Reload';
import { configStore } from 'store';

//import reportWebVitals from './reportWebVitals';
import App from './AppLazy';
import { register } from './serviceWorkerRegistration';

const { persistor, store } = configStore();

window.store = store;

ReactDOM.render(<App store={store} persistor={persistor} />, document.getElementById('root'));

/* istanbul ignore next */
register({
  onUpdate: () => {
    store.dispatch(showAlert(<Reload />, { id: 'sw-update', icon: 'bolt', timeout: 0 }));
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log); // eslint-disable-line no-console
