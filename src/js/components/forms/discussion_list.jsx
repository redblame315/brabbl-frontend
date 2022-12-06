import forms from '../common/newforms/newforms';
import {
  DISCUSSION_LIST_SEARCH_BY_SHOW_ALL,
  DISCUSSION_LIST_SEARCH_BY_ANY_TAG,
  DISCUSSION_LIST_SEARCH_BY_ALL_TAGS,
} from '../../constants';
import i18next from 'i18next';

let DiscussionListForm = function DiscussionListForm() {
  return forms.Form.extend({
    rowCssClass: 'row',
    errorCssClass: 'err',
    required: true,
    name: forms.CharField({
      label: i18next.t('List name'),
      helpText: '',
      maxLength: 160,
      errorMessages: {
        required: i18next.t('Please provide a list name'),
        maxLength: i18next.t('The list name must not exceed 160 characters'),
      },
    }),
    search_by: forms.TypedChoiceField({
      label: i18next.t('Content of list'),
      choices: [
        [DISCUSSION_LIST_SEARCH_BY_SHOW_ALL, i18next.t('Show all')],
        [DISCUSSION_LIST_SEARCH_BY_ANY_TAG, i18next.t('Show sum of tags')],
        [DISCUSSION_LIST_SEARCH_BY_ALL_TAGS, i18next.t('Show intersection of tags')],
      ],
      required: true,
      errorMessages: {
        required: i18next.t('Please select the content of list'),
      },
      widget: forms.RadioSelect,
    }),
    hide_tag_filter_for_users: forms.BooleanField({
      label: i18next.t('Hide tag filter for Users'),
      helpText: i18next.t('Tag filter in the list view will not be shown to users'),
      required: false,
    }),
  });
};

export default DiscussionListForm;
