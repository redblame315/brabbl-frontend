import i18next from './i18n';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './components/app';
import '../fonts/font-awesome.scss';
import 'bootstrap/dist/css/bootstrap.css'

const store = configureStore();

render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('brabbl-widget')
);
