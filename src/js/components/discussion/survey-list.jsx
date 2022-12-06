import React from 'react';
import PropTypes from 'prop-types';
import StatementItem from './statement-item';
import StatementDetail from './statement-detail';
import SurveyStatementItemWrapper from './survey-statement-item';
import { showModal, setSurveySorting } from '../../actions/app';
import { MODAL_STATEMENT, MSG_ORDER_BY_AVERAGE_RATING,
         MSG_ORDER_BY_DATE, BY_DATE, BY_RELEVANCE, MSG_ORDER_BY_VOTES,
         BY_VOTES, DISCUSSION_STARTED, CAN_ADD_STATEMENT,
         STATEMENT_STATUS_HIDDEN , } from '../../constants';
import { DropDown, DropDownItem } from '../dropdown';
import i18next from 'i18next';
import CountdownTimer from './countdown-timer';
import BaseDetailView from '../base-detail-view';
import { UseWording, UserHasPermission } from '../../utils';
import FlipMove from 'react-flip-move';
import DiscussionMeta from './discussion-meta';
import API from '../../api';
import { Option, OptionsList } from '../options';
import { CAN_CHANGE_DISCUSSION, MODAL_DISCUSSION, MODAL_DELETE_DISCUSSION, MODAL_RESET_DISCUSSION, MODAL_EXPORT_DISCUSSION } from '../../constants';

const SurveyStatementItem = SurveyStatementItemWrapper(StatementItem, StatementDetail);

class SurveyList extends BaseDetailView {
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
  getOptionsList = () => {
    const { user, customer } = this.props;
    let optionList, editOption, deleteOption, resetOption, exportOption;
    let { is_editable: isEditable, is_deletable: isDeletable } = this.props.discussion;
    if (!isEditable && !isDeletable) {
      return null
    }
    editOption = (
      <Option
        icon="pencil"
        onClick={ this.onEditDiscussion }>
        { i18next.t('key_discussion-options_edit') } { UseWording(this.props, 'discussion') }
      </Option>
    )
    exportOption = (
      <Option
        icon="file"
        onClick={ this.onExportDiscussion }>
        { i18next.t('key_discussion-options_export') } { UseWording(this.props, 'discussion') }
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
    return optionList
  }
  render() {
    let props = this.props;
    let addStatementButtonBottom,
      surveyStatements;
    let { user, discussion, dispatch, app: { surveyOrder } } = props;

    if ((discussion.user_can_add_replies || UserHasPermission(user, CAN_ADD_STATEMENT))
      && this.state.discussion_status === DISCUSSION_STARTED) {
      addStatementButtonBottom = (
        <div className="survey-button">
          <button
            className="primary full-width" ref="survey_button"
            onClick={() => {
              if (user) {
                dispatch(showModal(MODAL_STATEMENT));
              } else {
                dispatch(showModal('LOGIN'));
              }
            }}
          >
            { UseWording(props, 'survey_add_answer_button_bottom') }
          </button>
        </div>
      );
    }

    let statements = discussion.statements;
    let listHeader,
      addStatementButtonTop;
    statements.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    if (surveyOrder === BY_RELEVANCE) {
      if (statements.length > 0 && statements[0].barometer) {
        statements.sort((a, b) => {
          let rating_b = b.status === STATEMENT_STATUS_HIDDEN ? -4 : b.barometer.rating;
          let rating_a = a.status === STATEMENT_STATUS_HIDDEN ? -4 : a.barometer.rating;
          return rating_b - rating_a;
        });
      }
    } else if (surveyOrder === BY_VOTES) {
      statements.sort((a, b) => b.barometer.rating - a.barometer.rating).sort((a, b) => {
        let user_rating_a = a.barometer.user_rating === undefined ? -99 : a.barometer.user_rating;
        let user_rating_b = b.barometer.user_rating === undefined ? -99 : b.barometer.user_rating;
        return user_rating_b - user_rating_a;
      });
    }
    surveyStatements = statements.map(statement =>
      <SurveyStatementItem
        key={statement.id}
        {...props}
        statement={statement}
        discussion={discussion}
        discussion_status={this.state.discussion_status}
      />
    );
    if (discussion.user_can_add_replies || UserHasPermission(user, CAN_ADD_STATEMENT)) {
      if (this.state.discussion_status === DISCUSSION_STARTED) {
        addStatementButtonTop = (
          <a className="add-answer" onClick={() => {
            if (user) {
              this.refs.survey_button.focus();
              dispatch(showModal(MODAL_STATEMENT));
            } else {
              dispatch(showModal('LOGIN'));
            }
          }}
          >
            <i className="fa fa-plus-circle prefix-icon"></i>
            { UseWording(props, 'survey_add_answer_button_top') }
          </a>
        );
      } else {
        addStatementButtonTop = (
          <span className="add-answer not-active" onClick={this.handleDisabledDiscussion}>
            <i className="fa fa-plus-circle prefix-icon"></i> { i18next.t('Add new suggestion') }
          </span>
        );
      }
    }
    let statement_text = statements.length === 1 ? 'survey_statement' : 'survey_statements';
    let prefixItem = (
    <span className="dropdown-prefix">{statements.length} { UseWording(props, statement_text) } {' | '}</span>
    )
    let statementLength = (
      <span className="statement-length">{statements.length} { UseWording(props, statement_text) }:</span>
      )
    if (statements.length > 0) {
      if (discussion.has_barometer) {
        listHeader = (
          <DropDown className="argument-sorting" default_children_index={0} prefixItem={prefixItem}>
            <DropDownItem onSelect={() => dispatch(setSurveySorting(BY_RELEVANCE))}>
              { i18next.t(MSG_ORDER_BY_AVERAGE_RATING) }
            </DropDownItem>
            <DropDownItem onSelect={() => dispatch(setSurveySorting(BY_DATE))}>
              { i18next.t(MSG_ORDER_BY_DATE) }
            </DropDownItem>
            <DropDownItem onSelect={() => dispatch(setSurveySorting(BY_VOTES))}>
              { i18next.t(MSG_ORDER_BY_VOTES) }
            </DropDownItem>
          </DropDown>
        );
      } else {
        listHeader = (
          <DropDown className="argument-sorting" default_children_index={0} prefixItem={prefixItem}>
            <DropDownItem onSelect={() => dispatch(setSurveySorting(BY_DATE))}>
              { i18next.t(MSG_ORDER_BY_DATE) }
            </DropDownItem>
          </DropDown>
        );
      }
    } else {
      listHeader = (
        <div className="empty-list">
          { i18next.t('No suggestions yet') + '. ' + i18next.t('Start the discussion now!') }
        </div>
      );
    }
    return (
      <div>
        <div className="survey-list-header">
          <DiscussionMeta
            discussion={discussion}
            optionsList={this.getOptionsList()}
            dispatch={this.props.dispatch}/>
          <CountdownTimer {...this.props} />
          {statementLength}
          {addStatementButtonTop}
          {listHeader}
        </div>
        <div className="discussion-body survey-body">
          <FlipMove>
          {surveyStatements}
          </FlipMove>
          {addStatementButtonBottom}
        </div>
      </div>
    );
  }
}

SurveyList.propTypes = {
  user: PropTypes.object,
  app: PropTypes.object.isRequired,
  discussion: PropTypes.object.isRequired,
};


export default SurveyList;
