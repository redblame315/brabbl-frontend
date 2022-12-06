import moment from 'moment';
import 'classlist-polyfill';
import config from './config';
import { addCSS } from './utils';
import { getQueryStringParams } from './utils';
moment.locale('en');

addCSS(`${config.CSSBaseUrl}main.css`);
const packageJson = require('../../package.json');

let articleId = getQueryStringParams("articleId");
let statementId = getQueryStringParams("statementId");
let deeplink = getQueryStringParams("view");
let email = getQueryStringParams("email");
let token = getQueryStringParams("token");
if(articleId) {
  window.brabbl.articleId = articleId;
}
if(statementId) {
  window.brabbl.statementId = Number(statementId);
}
if(deeplink) {
  window.brabbl.deeplink = deeplink;
}
if(email) {
  window.brabbl.email = email;
}
if(token) {
  window.brabbl.token = token;
}

window.brabbl.appVersionNumber = packageJson.version

let App = null;
if (process.env.NODE_ENV === 'production') {
  App = require('./init.prod');
} else {
  App = require('./init.dev');
}
export default App;