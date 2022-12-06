import React from 'react';
import i18next from 'i18next';
import object from 'isomorph/object';
import { DateTimeInput } from './components/common/newforms/newforms';
import { DateTimeField } from './components/common/newforms/newforms';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import is from 'isomorph/is';
import ValidationError from 'validators';
import moment from 'moment';

export let ellipsisText = (str, maxLength = 10) => {
  if(!str) return null;
  if(str.length <= maxLength) return str;
  str = str.substring(0, maxLength) + "...";
  return str;
}

export const getQueryStringParams = (param, url) => {
    // first decode URL to get readable data
    var href = decodeURIComponent(url || window.location.href);
    // regular expression to get value
    var regEx = new RegExp('[?&]' + param + '=([^&#]*)', 'i');
    var value = regEx.exec(href);
    // return the value if exist
    return value ? value[1] : null;
}

export const setBrabblHash = () => {
  //location.hash = 'widget';
  //location.hash = 'brabbl-widget';
};

export const addCSS = (path) => {
  const head = document.head;
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = path;
  head.appendChild(link);
};

export const cutUrlHash = (url) => (url !== undefined ? url.split('#')[0] : '');

// get intersection of 2 arrays
export const IntersecArrays = (A, B) => {
  let m = A.length,
    n = B.length,
    c = 0,
    C = [];
  for (let i = 0; i < m; i++) {
    let j = 0,
      k = 0;
    while (B[j] !== A[i] && j < n) j++;
    while (C[k] !== A[i] && k < c) k++;
    if (j !== n && k === c) C[c++] = A[i];
  }
  return C;
};

export function UserHasPermission(user, permission, customer) {
  if(customer && customer.is_private) {
    return user && user.is_confirmed && user.permissions.indexOf(permission) !== -1;
  } else {
    return user && user.permissions.indexOf(permission) !== -1;
  }

}

export function UseWording(properties, key) {
  let wordings = {},
    barometer_options = properties.customer.barometerOptions,
    current_wording,
    wording = {};

  for (let i = 0; i < barometer_options.length; i++) {
    wordings[barometer_options[i].id] = barometer_options[i];
  }
  if (properties.discussion && 'discussion_wording' in properties.discussion) {
    current_wording = properties.discussion.discussion_wording;
  } else {
    current_wording = properties.customer.default_wording;
  }
  if (wordings && current_wording in wordings) {
    wording = wordings[current_wording];
  }
  let default_wordings = {
    rating_1: i18next.t('very poor'),
    rating_2: i18next.t('poor'),
    rating_3: i18next.t('ok'),
    rating_4: i18next.t('good'),
    rating_5: i18next.t('very good'),
    list_header_contra: i18next.t('CONTRA'),
    list_header_pro: i18next.t('PRO'),
    header_contra: i18next.t('Contra-Argument'),
    header_pro: i18next.t('Pro-Argument'),
    button_short_new_contra: i18next.t('Add new argument'),
    button_short_new_pro: i18next.t('Add new argument'),
    button_new_contra: i18next.t('Write new argument'),
    button_new_pro: i18next.t('Write new argument'),
    survey_statement: i18next.t('Statement'),
    survey_statements: i18next.t('Statements'),
    survey_add_answer_button_top: i18next.t('Write new statement'),
    survey_add_answer_button_bottom: i18next.t('Write new statement'),
    reply_counter: i18next.t('Reply'),
    reply_counter_plural: i18next.t('Replies'),
    statement_header: i18next.t('Reply'),
    statement_list_header: i18next.t('Answer'),
  };
  if (key in wording && wording[key].length > 0) {
    return wording[key];
  } else if (key in default_wordings) {
    return default_wordings[key];
  } else {
    return '';
  }
}
export function UseNotifyWording(properties, key) {
  let default_wordings = {
    notification_registration: i18next.t(`Thank you for your registration!
    You will receive an email with a confirmation link.
    Once you click this, you can join the discussion.`),
    notification_logout: i18next.t('You have been logged out') + '. ' + i18next.t('Come back soon!'),
    notification_signup_required: i18next.t('You must sign in to participate in the discussion'),
    notification_report_posted: i18next.t('Thanks for reporting! We will review that content shortly'),
    notification_message_posted: i18next.t('Thank you for your message') + '. ' + i18next.t(
      'We will consider the amount shortly'),
    notification_message_updated: i18next.t('The argument has been changed'),
    notification_profile_updated: i18next.t('The profile has been updated successfully'),
    notification_reset_password: i18next.t('An email was sent with instructions on how to reset the password'),
    hidden_posting_title: i18next.t('Content removed'),
    hidden_posting_body: 'XXX this text should not be visible. check notification_wording for "content_removed".',
    notification_discussion_already_completed: 'Discussion already completed.',
    notification_discussion_not_started: 'Discussion has not started yet.',
  };
  if(properties && properties.customer && properties.customer.notification_wording) {
    let wording = properties.customer.notification_wording;
    if (key in wording && wording[key].length > 0) {
      return wording[key];
    } else if (key in default_wordings) {
      return default_wordings[key];
    } else {
      return '';
    }
  } else {
    console.log("wording property error")
    if (key in default_wordings) {
      return default_wordings[key];
    } else {
      return '';
    }
  }

}
export function resizeBase64(base64, maxWidth, maxHeight){
  return new Promise(function(resolve,reject){
    if(!base64) resolve(null)
    // Max size for thumbnail
    if(typeof(maxWidth) === 'undefined')  maxWidth = 500;
    if(typeof(maxHeight) === 'undefined')  maxHeight = 500;
      // Create and initialize two canvas
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var canvasCopy = document.createElement("canvas");
    var copyContext = canvasCopy.getContext("2d");
      // Create original image
    var img = new Image();
    img.src = base64;
    img.onload = () => {
      // Determine new ratio based on max size
      var ratio = 1;
      if(img.width > maxWidth)
        ratio = maxWidth / img.width;
      else if(img.height > maxHeight)
        ratio = maxHeight / img.height;
      // Draw original image in second canvas
      canvasCopy.width = img.width;
      canvasCopy.height = img.height;
      copyContext.drawImage(img, 0, 0);
    
      // Copy and resize second canvas to first canvas
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg"))
    }
  })
}

let DateTimePickerInput = DateTimeInput.extend({
  formatType: 'YYYY-MM-DD HH:mm',
});

DateTimePickerInput.prototype.render = function render(name, value, kwargs) {
  kwargs = object.extend({ attrs: null }, kwargs);
  if (value === null || value === false) {
    value = '';
  }
  let finalAttrs = this.buildAttrs(kwargs.attrs, { type: this.inputType,
                                                  name: name });
  // Hidden inputs can be made controlled inputs by default, as the user
  // can't directly interact with them.
  let valueAttr = (kwargs.controlled || this.isHidden ? 'value' : 'defaultValue');
  if (!(valueAttr === 'defaultValue' && value === '')) {
    finalAttrs[valueAttr] = (value !== '' ? '' + value : value);
  }
  delete(finalAttrs.onChange);
  return (<Datetime
    inputProps={ finalAttrs }
    initialValue={ finalAttrs[valueAttr] }
    dateFormat="YYYY-MM-DD"
    timeFormat="HH:mm"
  />);
};

let DateTimePickerField = DateTimeField.extend({
  widget: DateTimePickerInput,
  constructor: function DateTimePickerField(kwargs) {
    if (!(this instanceof DateTimePickerField)) { return new DateTimePickerField(kwargs); }
    DateTimeField.call(this, kwargs);
  },
});

DateTimePickerField.prototype.toJavaScript = function toJS(value) {
  let input = document.getElementById(this.widgetAttrs.id);
  if (input) {
    value = input.value;
  }

  if (this.isEmptyValue(value)) {
    return null;
  }
  if (value instanceof Date) {
    return value;
  }
  if (is.Array(value)) {
    if (value.length !== 2) {
      throw ValidationError(this.errorMessages.invalid, { code: 'invalid' });
    }
    if (this.isEmptyValue(value[0]) && this.isEmptyValue(value[1])) {
      return null;
    }
    value = value.join(' ');
  }
  return DateTimeField.prototype.toJavaScript.call(this, value);
};

export default DateTimePickerField;
