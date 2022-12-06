import forms from '../common/newforms/newforms';
import ToggleCounterBaseForm from './toggle';
import i18next from 'i18next';


let ArgumentForm = function ArgumentForm() {
  return ToggleCounterBaseForm.extend({
    rowCssClass: 'row',
    errorCssClass: 'err',
    toggleFieldName: 'is_pro',
    is_pro: forms.BooleanField({
      label: i18next.t('Opinion'),
      widgetAttrs: {
        'className': 'toggle',
        'wrapperClass': 'toggleWrapper',
        'leftText': i18next.t('Contra'),
        'rightText': i18next.t('Pro'),
      },
      required: false,
    }),
    title: forms.CharField({
      label: i18next.t('Subject'),
      maxLength: 120,
      errorMessages: {
        required: i18next.t('Please provide a subject'),
      },
    }),
    text: forms.CharField({
      widget: forms.Textarea,
      label: i18next.t('Argument'),
      maxLength: 500,
      errorMessages: {
        required: i18next.t('Please provide details for your argument'),
      },
      required: false,
    }),
    constructor(kwargs) {
      ArgumentForm().__super__.constructor.call(this, kwargs);
      if (!kwargs.data) {
        delete this.fields.is_pro;
      }
    },
  });
};

export default ArgumentForm;
