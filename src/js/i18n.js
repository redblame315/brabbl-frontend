import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import { loadTrans } from './actions/async';


function loadLocales(url, options, callback, data) {
  try {
    let waitForLocale = loadTrans();
    waitForLocale((locale) => {
      callback(locale, { status: '200' });
    });
  } catch (e) {
    callback(null, { status: '404' });
  }
}


i18next
  .use(XHR)
  .init({
    backend: {
      loadPath: '{{lng}}',
      parse: (data) => data.resp,
      ajax: loadLocales,
    },
  }, (err, t) => {
    t();
  });
