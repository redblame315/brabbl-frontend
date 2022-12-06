import React from 'react';
import { DropDown, DropDownItem } from './dropdown';
import { filterDiscussionsByRelevance } from '../actions/app';
import i18next from 'i18next';

const TimeLimitSelect = ({ dispatch }) => {
  let filterChoices = [];
  let filters = {
    'all': i18next.t('All'),
    'active': i18next.t('Active'),
    'non_active': i18next.t('Not Active'),
  };
  Object.keys(filters).forEach(key => {
    filterChoices.push(
      <DropDownItem onSelect={() => dispatch(filterDiscussionsByRelevance(key))}>
        <span>{filters[key]}</span>
      </DropDownItem>
    );
  });
  return (
    <DropDown
      className="discussion-header-time-limit"
      fixedActiveItem={i18next.t('Filter by status')}
    >
        {filterChoices}
    </DropDown>
  );
};

// TimeLimitSelect.propTypes = {};

export default TimeLimitSelect;
