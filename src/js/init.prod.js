import React from 'react';
import { render } from 'react-dom';
import i18next from './i18n';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './components/app';
import '../fonts/font-awesome.scss';

// Include all themes in theme folder so they are found by webpack and get extracted to
// separate stylesheets
const requireAll = (r) => r.keys().forEach(r);
requireAll(require.context('../css/themes/', true, /\.scss$/));

const store = configureStore();

try {
  render(
    <Provider store={store}>
      <div>
        <App />
      </div>
    </Provider>,
    document.getElementById('brabbl-widget')
  );
} catch (exc) {
  /* eslint no-console:0, no-unused-expressions:0 */
  window.console && console.error && console.error(exc);

  /* log with raven */
  // let log_exception = () => {
  //     /* eslint no-undef:0 */
  //     Raven.config('https://5e20bee2b806460684864cc630e1ab7c@sentry.jonasundderwolf.de/39').install();
  //     Raven.captureException(exc);
  //   },
  //   js = document.createElement('script');
  // js.type = 'text/javascript';
  // js.src = '//cdn.ravenjs.com/1.1.15/jquery,native/raven.min.js';
  // js.onreadystatechange = log_exception;
  // js.onload = log_exception;
  // document.body.appendChild(js);
}
