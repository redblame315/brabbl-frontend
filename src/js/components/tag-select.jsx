import React from 'react';
import PropTypes from 'prop-types';
import { DropDown, DropDownItem } from './dropdown';
import { filterDiscussions } from '../actions/app';
import i18next from 'i18next';

const TagSelect = ({ tags, dispatch }) => {
  let tagChoices = [];
  let allChoice = (
    <DropDownItem onSelect={() => dispatch(filterDiscussions(null))}>
      <span>{i18next.t('All')}</span>
    </DropDownItem>
  );
  tagChoices.push(allChoice);
  tags.forEach(tag => {
    tagChoices.push(
      <DropDownItem onSelect={() => dispatch(filterDiscussions(tag))}>
        <span>{tag}</span>
      </DropDownItem>
    );
  });
  return (
    <DropDown
      className="discussion-header-tags"
      fixedActiveItem={i18next.t('Choose topic')}
    >
        {tagChoices}
    </DropDown>
  );
};

TagSelect.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default TagSelect;
