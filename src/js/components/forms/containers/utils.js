import i18next from 'i18next';

export let updateFormErrors = (form, error) => {
  let resp = error.response;
  let field;
  let errors = resp.data;
  if (resp.status >= 500) {
    form.addError('', i18next.t(
        'There was a server error') + '. ' + i18next.t(
        'The action could not be carried out') + '.');
  } else {
    if (typeof errors === 'string') {
      form.addError('', errors);
      return;
    }
    if ('detail' in errors) {
      form.addError('', errors.detail);
      return;
    }
    
    let keys = Object.keys(errors)
    keys.forEach(key => {
      field = '';
      if (form.fields.hasOwnProperty(key)) {
        field = key;
      }
      if(Array.isArray(errors[key])) {
        for (let i = 0, l = errors[key].length; i < l; i++) {
          form.addError(field, errors[key][i]);
        }
      } else {
        let subArrayError = errors[key];
        Object.keys(subArrayError).forEach(key2 => {
          for (let i = 0, l = subArrayError[key2].length; i < l; i++) {
            form.addError(field, subArrayError[key2][i]);
          }
        })
      }

    });
  }
};
