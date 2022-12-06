import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Barometer from './barometer';
import CountdownTimer from './countdown-timer';
import { ArgumentList } from '../argument';
import i18next from 'i18next';
import BaseDetailView from '../base-detail-view';
import { UseWording, UseNotifyWording } from '../../utils';

import DiscussionMeta from './discussion-meta';
import { Option, OptionsList } from '../options';
import { MODAL_DISCUSSION, MODAL_DELETE_DISCUSSION,
         MODAL_DELETE_STATEMENT, MODAL_STATEMENT, MODAL_RESET_DISCUSSION,
         MODAL_EXPORT_DISCUSSION } from '../../constants';
import { UserHasPermission } from '../../utils';
import { showNotification, showModal, showStatement } from '../../actions/app';
import { reloadDiscussion } from '../../actions/async';

import API from '../../api';

class Discussion extends BaseDetailView {
  
  onEditStatement = (e) => {
    let { dispatch, statement, app } = this.props;
    dispatch(
      showModal(
        MODAL_STATEMENT, {
          statement: statement.statement,
          image: statement.image,
          video: statement.video,
          statementId: this.props.statement.id,
          pdfs: statement.pdfs,
          description: statement.description,
          copyright_info: statement.copyright_info
        })
    )
  }
  onDeleteStatement = (statementId) => {
    this.props.dispatch(showModal(MODAL_DELETE_STATEMENT, { ...this.props, statementId: statementId }))
  }
  onReportStatement = () => {
    let { dispatch, statement, app } = this.props;
    API.flag({ type: 'statement', 'id': statement.id }).then(() => {
      dispatch(
        showNotification(UseNotifyWording(this.props, 'notification_report_posted'))
      );
      dispatch(reloadDiscussion(app.articleId));
    });
  }
  onEditDiscussion = () => {
    this.props.dispatch(showModal(MODAL_DISCUSSION, { ...this.props }))
  }
  onDeleteDiscussion = () => {
    this.props.dispatch(showModal(MODAL_DELETE_DISCUSSION, { ...this.props }))
  }
  onResetDiscussion = () => {
    this.props.dispatch(showModal(MODAL_RESET_DISCUSSION, { ...this.props }))
  }
  onExportDiscussion = () => {
    this.props.dispatch(showModal(MODAL_EXPORT_DISCUSSION, { ...this.props }))
  }
  getOptionsList = (isStatement) => {
    let optionList, editOption, deleteOption, reportOption, resetOption, exportOption;
    const { user, customer } = this.props;
    if (isStatement) {
      let { is_editable: isEditable, is_deletable: isDeletable } = this.props.statement;
      editOption = (
        <Option
          icon="pencil"
          onClick={ this.onEditStatement }>
          { i18next.t('key_survey-statement-options_edit') } { UseWording(this.props, 'statement') }
        </Option>
      )
      deleteOption = (
        <Option
          icon="trash"
          onClick={() => {
            this.onDeleteStatement(this.props.app.statementId)
          } }
        >
          { i18next.t('key_survey-statement-options_delete') } { UseWording(this.props, 'statement') }
        </Option>
      )
      reportOption = (
        <Option
          icon="flag-o"
          onClick={this.onReportStatement}
        >
          { i18next.t('key_survey-statement-options_report') } { UseWording(this.props, 'statement') }
        </Option>
      )
      optionList = (
        <OptionsList>
          {isEditable && editOption}
          {isDeletable && deleteOption}
        </OptionsList>
      );
    } else {
      let { is_editable: isEditable, is_deletable: isDeletable } = this.props.discussion;
      exportOption = (
        <Option
          icon="file"
          onClick={ this.onExportDiscussion }>
          { i18next.t('key_discussion-options_export') } { UseWording(this.props, 'discussion') }
        </Option>
      )
      editOption = (
        <Option
          icon="pencil"
          onClick={ this.onEditDiscussion }>
          { i18next.t('key_discussion-options_edit') } { UseWording(this.props, 'discussion') }
        </Option>
      )
      deleteOption = (
        <Option
          icon="trash"
          onClick={ this.onDeleteDiscussion }
        >
          { i18next.t('key_discussion-options_delete') } { UseWording(this.props, 'discussion') }
        </Option>
      )
      resetOption = (
        <Option
          icon="trash"
          onClick={ this.onResetDiscussion }
        >
          { i18next.t('key_discussion-options_reset') } { UseWording(this.props, 'discussion') }
        </Option>
      )
      optionList = (
        <OptionsList>
          {isEditable && editOption}
          {exportOption}
          {isDeletable && deleteOption}
          {isDeletable && resetOption}
        </OptionsList>
      );
    }
    return optionList
  }

  render() {
    let { discussion, app } = this.props;
    let { argumentOrder, argumentLimit } = app;
    let main_statement = discussion.statements.sort((a, b) => a.id - b.id)[0];
    let default_statement = { arguments: [], created_at: '', created_by: '' };
    let statement = this.props.statement || main_statement || default_statement;
    let args = statement.arguments;
    let barometer,
      head,
      argumentList;
    let time_ago = moment(statement.created_at).fromNow();
    let title = this.props.title || discussion.statement;
    let description = this.props.description || discussion.description;
    if (discussion.has_barometer) {
      barometer = statement.barometer;
      let { rating, user_rating, count, count_ratings, wording } = barometer;
      barometer = (
        <div className="barometer-container">
          <Barometer
            {...this.props}
            statement={statement}
            ratingAverage={rating}
            ratingUser={user_rating}
            ratingsTotal={count}
            wording={wording}
            countRatings={count_ratings}
            discussion_status={this.state.discussion_status}
            showStartSign={Boolean(true)}
          />
        </div>
      );
    }

    if (discussion.has_arguments) {
      argumentList = (
        <ArgumentList
          {...this.props}
          args={args}
          ordering={argumentOrder}
          limit={argumentLimit}
          statement={statement}
          discussion_status={this.state.discussion_status}
        />
      );
    }

    if (app.statementId) {
      let statementInfo = {
        ...statement,
        statement: title
      }
      head = (
        <DiscussionMeta 
          discussion={statementInfo}
          isStatement
          optionsList={this.getOptionsList(true)}
          dispatch={this.props.dispatch}/>
      );
    } else {
      let discussionInfo = {
        ...discussion,
        statement: title,
        description: description,
        author: this.props.author
      }
      head = (
        <DiscussionMeta
          discussion={discussionInfo}
          optionsList={this.getOptionsList(false)}
          dispatch={this.props.dispatch}/>
      );
    }
    return (
      <div className="discussion-body">
        {head}
        <CountdownTimer {...this.props} />
        {barometer}
        <div className="discussion-socialsharing"></div>
        {argumentList}
      </div>
    );
  }
}
Discussion.propTypes = {
  discussion: PropTypes.object.isRequired,
  statement: PropTypes.object,
  app: PropTypes.object,
  title: PropTypes.string,
};
export default Discussion;
