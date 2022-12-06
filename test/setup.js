/* setup.js */

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
import ReactDOM from 'react-dom';
import register from 'ignore-styles';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'node-fetch';

register(['.png', '.css']);

const { window } = new JSDOM('<!doctype html><html><body></body></html>');
 
function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}
 
global.window = window;
global.window.brabbl = {
  customerId: "12345",
  articleId: "123",
}

global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

global.fetch = fetch;
 
copyProps(window, global);
ReactDOM.createPortal = jest.fn(modal => modal);

// Configure Enzyme with React 16 adapter
Enzyme.configure({ adapter: new Adapter() });
