import forms from '../common/newforms/newforms';
import ToggleCounterBaseForm from './toggle';
import { ONLY_ARGUMENTS, ONLY_BAROMETER, ARGUMENTS_AND_BAROMETER } from '../../constants';
import i18next from 'i18next';
import DateTimePickerField from '../../utils';

const DISCUSSION_TYPE_VALUES = {
  ONLY_ARGUMENTS: { has_barometer: false, has_arguments: true },
  ONLY_BAROMETER: { has_barometer: true, has_arguments: false },
  ARGUMENTS_AND_BAROMETER: { has_barometer: true, has_arguments: true },
};

let DiscussionForm = function DiscussionForm(customer) {
  return ToggleCounterBaseForm.extend({
    rowCssClass: 'row',
    errorCssClass: 'err',
    toggleFieldName: 'multiple_statements_allowed',
    multiple_statements_allowed: forms.BooleanField({
      label: i18next.t('Survey'),
      widgetAttrs: {
        'className': 'toggle',
        'wrapperClass': 'toggleWrapper toggleDiscussion',
        'leftText': i18next.t('key_discussion-modal_discussion-type-section_pro-contra-discussion-name'),
        'rightText': i18next.t('Survey'),
        'helpText': i18next.t('key_discussion-modal_discussion-type-help-text'),
      },
      required: false,
    }),
    statement: forms.CharField({
      label: i18next.t('Thesis statement or question'),
      helpText: '',
      maxLength: 160,
      errorMessages: {
        required: i18next.t('Please provide a thesis statement or question'),
        maxLength: i18next.t('The thesis statement / question must not exceed 160 characters'),
      },
      widget: forms.Textarea,
    }),
    description: forms.CharField({
      label: i18next.t('key_discussion-modal_textfield-title_description-of-discussion'),
      required: false,
      helpText: '',
      maxLength: 1000,
      widget: forms.Textarea
    })
  });
};

let DiscussionPrivateOptionForm = function DiscussionPrivateOptionForm(customer) {
  return ToggleCounterBaseForm.extend({
    rowCssClass: 'row',
    errorCssClass: 'err',
    toggleFieldName: 'is_private',
    is_private: forms.BooleanField({
      label: i18next.t('key_discussion-modal_choose-private-label'),
      widgetAttrs: {
        'className': 'toggle',
        'wrapperClass': 'toggleWrapper toggleDiscussion',
        'leftText': i18next.t('key_discussion-modal_choose-private_public-text'),
        'rightText': i18next.t('key_discussion-modal_choose-private_private-text'),
        'helpText': i18next.t('key_discussion-modal_choose-private-help-text'),
      },
      required: false,
    }),
  });
};

let DiscussionDateTimeForm = function DiscussionDateTimeForm(customer) {
  return forms.Form.extend({
    rowCssClass: 'row',
    errorCssClass: 'err',
    start_time: DateTimePickerField({
      label: i18next.t('Start Time'),
      helpText:  i18next.t('key_discussion-modal_start-time-help-text'),
      initial: false,
      required: false,
      widgetAttrs: {
        id: 'start_time_datetime',
        placeholder: i18next.t('Now'),
      },
    }),
    end_time: DateTimePickerField({
      label: i18next.t('End Time'),
      helpText:  i18next.t('key_discussion-modal_end-time-help-text'),
      initial: false,
      required: false,
      widgetAttrs: {
        id: 'end_time_datetime',
        placeholder: i18next.t('Active Forever'),
      },
    })
  });
};
let DiscussionExternalUrlForm = function DiscussionExternalUrlForm(customer) {
  return forms.Form.extend({
    rowCssClass: 'row',
    errorCssClass: 'err',
    url: forms.CharField({
      label: i18next.t('key_discussion-modal_textfield-url_web-url-of-discussion'),
      required: false,
      helpText: i18next.t('key_discussion-modal_textfield-url_web-url-of-discussion-help-text'),
    }),
  });
};
let DiscussionSettingsForm = function DiscussionSettingsForm() {
  return forms.Form.extend({
    rowCssClass: 'row',
    errorCssClass: 'err',
    discussionType: forms.TypedChoiceField({
      label: i18next.t('Settings'),
      choices: [
        [ONLY_ARGUMENTS, i18next.t('Just arguments')],
        [ONLY_BAROMETER, i18next.t('Just the Opiniometer')],
        [ARGUMENTS_AND_BAROMETER, i18next.t('Opiniometer plus Arguments')],
      ],
      coerce: (val) => DISCUSSION_TYPE_VALUES[val],
      helpText: i18next.t('key_discussion-modal_discussion-settings-help-text'),
      required: true,
      errorMessages: {
        required: i18next.t('Please select the type of discussion'),
      },
      widget: forms.RadioSelect }),
  });
};
let DiscussionOptionsForm = function DiscussionOptionsForm() {
  return forms.Form.extend({
    rowCssClass: 'row',
    errorCssClass: 'err',
    barometerType: forms.ChoiceField({
      label: i18next.t('Please select the Wording schema'),
      helpText: i18next.t('key_discussion-modal_wording-help-text'),
      required: true,
      errorMessages: {
        required: i18next.t('Please select the Wording schema'),
      },
      widget: forms.RadioSelect,
    }),

    constructor(kwargs) {
      DiscussionOptionsForm().__super__.constructor.call(this, kwargs);
      if (kwargs.barometerOptions) {
        let choices = kwargs.barometerOptions.map(option => [option.id, option.name, option.description]);
        this.fields.barometerType.setChoices(choices);
      }
    },
  });
};

let SurveyOptionsForm = function SurveyOptionsForm() {
  return forms.Form.extend({
    rowCssClass: 'row',
    errorCssClass: 'err',
    user_can_add_replies: forms.ChoiceField({
      label: i18next.t('Survey'),
      initial: true,
      helpText: i18next.t('key_discussion-modal_survey-option-help-text'),
      choices: [
        [true, i18next.t('Allow suggestions by users')],
        [false, i18next.t('Allow suggestions by admins only')],
      ],
      required: false,
      widget: forms.RadioSelect,
    }),
  });
};

let BarometerBehaviorForm = function BarometerBehaviorForm() {
  return forms.Form.extend({
    rowCssClass: 'row',
    errorCssClass: 'err',
    barometer_behavior: forms.ChoiceField({
      label: i18next.t('key_barometer_behavior'),
      initial: true,
      helpText: i18next.t('key_discussion-modal_barometer-behavior-help-text'),
      choices: [
        [1, i18next.t('key_barometer_always_show')],
        [2, i18next.t('key_barometer_show_only_for_voted_user')],
        [3, i18next.t('key_barometer_show_only_for_voted_user_or_admin')],
      ],
      required: false,
      widget: forms.RadioSelect,
    }),
  });
};

let ImageCopyrightFormForm = function ImageCopyrightFormForm(customer) {
  return forms.Form.extend({
    rowCssClass: 'row',
    errorCssClass: 'err',
    copyright_info: forms.CharField({
      label: i18next.t('key_discussion_statement-modal_textfield_copyright-info-label'),
      required: false,
      helpText: i18next.t('key_discussion_statement-modal_textfield_copyright-info-help-text'),
    }),
  });
};

export { DiscussionForm, DiscussionOptionsForm, SurveyOptionsForm, DiscussionDateTimeForm,
         DiscussionExternalUrlForm, DiscussionSettingsForm, DiscussionPrivateOptionForm,
         BarometerBehaviorForm, ImageCopyrightFormForm };
