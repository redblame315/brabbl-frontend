import React from 'react';
import PropTypes from 'prop-types';
import { showModal, updateDiscussionParticipants } from '../../actions/app';
import { MODAL_DISCUSSION, MODAL_DELETE_DISCUSSION, MODAL_RESET_DISCUSSION, MODAL_EXPORT_DISCUSSION } from '../../constants';
import { Option, OptionsList } from '../options';
import i18next from 'i18next';
import { UseWording } from '../../utils';

const ListDiscussionItemWrapper = (DiscussionItem) => class extends React.Component {

  static propTypes = {
    discussion: PropTypes.object.isRequired,
  }

  getTitle() {
    let { url, statement } = this.props.discussion;
    return (<h3 className="discussion-list-item-title">
        {statement}
      </h3>);
  }
  onDeleteDiscussion = () => {
    this.props.dispatch(showModal(MODAL_DELETE_DISCUSSION, { discussion: this.props.discussion }))
  }
  onResetDiscussion = () => {
    this.props.dispatch(showModal(MODAL_RESET_DISCUSSION, { ...this.props }))
  }
  onExportDiscussion = () => {
    this.props.dispatch(showModal(MODAL_EXPORT_DISCUSSION, { ...this.props }))
  }
  getOptionsList() {
    let { is_editable: isEditable, is_deletable: isDeletable } = this.props.discussion;
    let { dispatch } = this.props;
    let optionsList, editOption, deleteOption, resetOption, exportOption;
    if (isEditable) {
      editOption = (
        <Option
          icon="pencil"
          onClick={() => {
            dispatch(updateDiscussionParticipants(this.props.discussion.discussion_users))
            dispatch(showModal(MODAL_DISCUSSION, {
                discussion: this.props.discussion,
            }))
          }}
        >
          { i18next.t('key_discussion-options_edit') } { UseWording(this.props, 'discussion') }
        </Option>
      );
    }
    exportOption = (
      <Option
        icon="file"
        onClick={ this.onExportDiscussion }>
        { i18next.t('key_discussion-options_export') } { UseWording(this.props, 'discussion') }
      </Option>
    )
    if (isDeletable) {
      deleteOption = (
        <Option
          icon="trash"
          onClick={ this.onDeleteDiscussion }
        >
          { i18next.t('key_discussion-options_delete') } { UseWording(this.props, 'discussion') }
        </Option>
      );
      resetOption = (
        <Option
          icon="trash"
          onClick={ this.onResetDiscussion }
        >
          { i18next.t('key_discussion-options_reset') } { UseWording(this.props, 'discussion') }
        </Option>
      )
    }
    if( isEditable || isDeletable) {
      optionsList = (
        <OptionsList>
          {editOption}
          {exportOption}
          {deleteOption}
          {resetOption}
        </OptionsList>
      )
    }
    return optionsList;
  }

  handleDiscussionClick = (e) => {
    if (e) {
      e.preventDefault();
    }
    let { discussion } = this.props;
    let url = discussion.url + '#brabbl-widget';
    if(this.props.handleDiscussionClick) {
      this.props.handleDiscussionClick();
    } else {
      window.open(url, "_self")
    }
  }

  render() {
    let { discussion } = this.props;
    return (
      <DiscussionItem
        { ...this.props}
        statement={discussion}
        id={discussion.external_id}
        title={this.getTitle()}
        optionsList={this.getOptionsList()}
        barometerActive={!discussion.multiple_statements_allowed}
        handleStatementClick={this.handleDiscussionClick}
      />
    );
  }
};

export default ListDiscussionItemWrapper;
