import React from 'react';
import forms from '../common/newforms/newforms';
import i18next from 'i18next';
import { DISPLAY_USERNAME } from '../../constants';

let SignUpForm = function SignUpForm(customer) {
  let showUsername = customer.displayed_username === DISPLAY_USERNAME;
  return forms.Form.extend({
    constructor: function _SignUpForm(kwargs) {
      let user_info_settings = customer.user_info_settings || {},
        hidden_fields = [],
        required_fields = [];
      for (let i = 0; i < user_info_settings.length; i++) {
        if (!user_info_settings[i].show_in_signup) {
          let key = user_info_settings[i].key;
          if (key === 'firstname' || key === 'lastname') {
            key = key.replace('name', '_name');
          }
          hidden_fields.push(user_info_settings[i].key);
        } else if (user_info_settings[i].is_required) {
          required_fields.push(user_info_settings[i].key);
        }
      }
      let new_hidden_fields = []
      let new_required_fields = []
      if (!showUsername) {
        hidden_fields.push('username');
        required_fields.push('username');
        hidden_fields.forEach(item => {
          if(item != 'first_name' && item != 'last_name') {
            new_hidden_fields.push(item)
          }
        })
        required_fields.forEach(item => {
          if(item != 'first_name' && item != 'last_name') {
            new_required_fields.push(item)
          }
        })
      } else {
        hidden_fields.push('first_name');
        required_fields.push('first_name');
        hidden_fields.push('last_name');
        required_fields.push('last_name');
        hidden_fields.forEach(item => {
          if(item != 'username') {
            new_hidden_fields.push(item)
          }
        })
        required_fields.forEach(item => {
          if(item != 'username') {
            new_required_fields.push(item)
          }
        })
      }
      this.hidden_fields = new_hidden_fields;
      this.required_fields = new_required_fields;
      forms.Form.call(this, kwargs);
    },
    rowCssClass: 'row',
    errorCssClass: 'err',
    username: forms.CharField({
      required: showUsername,
      cssClass: !showUsername ? 'is-hidden' : '',
      label: i18next.t('User name'),
      errorMessages: {
        required: i18next.t('Please provide a (unique) username'),
      },
    }),
    first_name: forms.CharField({
      required: !showUsername,
      cssClass: showUsername ? 'is-hidden' : '',
      label: i18next.t('First name'),
      errorMessages: {
        required: i18next.t('Please provide a first name'),
      },
    }),
    last_name: forms.CharField({
      required: !showUsername,
      cssClass: showUsername ? 'is-hidden' : '',
      label: i18next.t('Last name'),
      errorMessages: {
        required: i18next.t('Please provide a last name'),
      },
    }),
    email: forms.EmailField({
      required: true,
      label: i18next.t('Email Address'),
      errorMessages: {
        required: i18next.t('Please provide an email address'),
        invalid: i18next.t('Please provide a valid email address'),
      },
    }),
    password: forms.CharField({
      widget: forms.PasswordInput,
      label: i18next.t('key_signup_provide-password_title'),
      errorMessages: {
        required: i18next.t('key_signup_provide-password_error-text'),
      },
    }),
    confirmPassword: forms.CharField({
      widget: forms.PasswordInput,
      label: i18next.t('key_signup_retype-password_title'),
      errorMessages: {
        required: i18next.t('key_signup_retype-password_error-text'),
      },
    }),
    gender: forms.TypedChoiceField({
      required: false,
      label: i18next.t('Gender'),
      choices: [
        [0, i18next.t('Whatever')],
        [1, i18next.t('Male')],
        [2, i18next.t('Female')],
      ],
      errorMessages: {
        required: i18next.t('Please provide a gender'),
      },
    }),
    year_of_birth: forms.IntegerField({
      required: false,
      label: i18next.t('Year of Birth'),
      widget: forms.TextInput(),
      errorMessages: {
        required: i18next.t('Please provide a years of birth'),
      },
    }),
    postcode: forms.CharField({
      required: false,
      label: i18next.t('Postcode'),
      errorMessages: {
        required: i18next.t('Please provide a postcode'),
      },
    }),
    city: forms.CharField({
      required: false,
      label: i18next.t('City'),
      errorMessages: {
        required: i18next.t('Please provide a city'),
      },
    }),
    bundesland: forms.TypedChoiceField({
      required: false,
      label: i18next.t('Bundesland'),
      choices: [
        ['-', 'Anders Land'],
        ['AT-1', 'Burgenland'],
        ['AT-2', 'Kärnten'],
        ['AT-3', 'Niederösterreich'],
        ['AT-4', 'Oberösterreich'],
        ['AT-5', 'Salzburg'],
        ['AT-6', 'Steiermark'],
        ['AT-7', 'Tirol'],
        ['AT-8', 'Vorarlberg'],
        ['AT-9', 'Wien'],
      ],
      errorMessages: {
        required: i18next.t('Please provide a bundesland'),
      },
    }),
    country: forms.CharField({
      required: false,
      label: i18next.t('Country'),
      errorMessages: {
        required: i18next.t('Please provide a country'),
      },
    }),
    organization: forms.CharField({
      required: false,
      label: i18next.t('Organization'),
      errorMessages: {
        required: i18next.t('Please provide a organization'),
      },
    }),
    position: forms.CharField({
      required: false,
      label: i18next.t('Position'),
      errorMessages: {
        required: i18next.t('Please provide a position'),
      },
    }),
    clean() {
      if (!showUsername) {
        this.cleanedData.username = null;
      }
      if (this.cleanedData.password &&
          this.cleanedData.confirmPassword &&
          this.cleanedData.password !== this.cleanedData.confirmPassword) {
        throw forms.ValidationError(i18next.t('The passwords do not match'));
      }
    },
    renderField(bf) {
      if (this.hidden_fields.indexOf(bf.name) !== -1) {
        return;
      }
      if (this.required_fields.indexOf(bf.name) !== -1) {
        bf.field.required = true;
      }
      let className = 'row form-field form-field-' + bf.htmlName;
      if (bf.errors() && bf.errors().data && bf.errors().data.length > 0) {
        className += ' err';
      }
      let isPending = bf.isPending();
      if (bf.htmlName === this.toggleFieldName) {
        className = className + ' form-field-toggle-field';
        return (this.render_toggle_field(className, bf));
      } else {
        return (
          <div className={className}>
            {bf.label && bf.labelTag()} {bf.render()}
            {isPending && ' '}
            {isPending && this.renderProgress()}
            {bf.errors().render()}
            {bf.helpText && ' '}
            {bf.helpTextTag()}
          </div>
        );
      }
    },
    render() {
      let formErrors;
      if (
        this.nonFieldErrors()
        && this.nonFieldErrors().data
        && this.nonFieldErrors().data.length > 0) {
        formErrors = (
          <ul className="errorlist">
            <li>{this.nonFieldErrors().render()}</li>
          </ul>
        );
      }
      let fields = this.visibleFields().map(
          this.renderField.bind(this)
      );
      return (<div>{formErrors}{fields}</div>);
    },
  });
};

export default SignUpForm;
