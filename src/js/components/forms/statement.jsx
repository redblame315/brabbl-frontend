import forms from '../common/newforms/newforms';
import i18next from 'i18next';
import ToggleCounterBaseForm from './toggle';

let StatementForm = function StatementForm() {
  return ToggleCounterBaseForm.extend({
    rowCssClass: 'row',
    errorCssClass: 'err',
    statement: forms.CharField({
      helpText: '',
      widget: forms.Textarea,
      label: i18next.t('key_statement-modal_statement-title_title-label'),
      maxLength: 120,
      errorMessages: {
        required: i18next.t('Please provide a suggestion'),
        maxLength: i18next.t('The suggestion must not exceed 300 characters'),
      }
    }),
    description: forms.CharField({
      helpText: '',
      widget: forms.Textarea,
      label: i18next.t('key_statement-modal_statement-description_title-label'),
      maxLength: 1000,
      required: false
    })
  });
};

let VideoForm = function VideoForm() {
  return forms.Form.extend({

    rowCssClass: 'row',
    errorCssClass: 'err',
    video: forms.URLField({
      label: '',
      initial: '',
      required: false,
    }),
  });
};

export { StatementForm, VideoForm };
