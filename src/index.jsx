import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store from './store';
import App from './components/App/';

const appRoot = document.getElementById('root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  appRoot,
);
