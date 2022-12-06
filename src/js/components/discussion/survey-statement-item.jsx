import React from 'react';
import PropTypes from 'prop-types';
import API from '../../api';
import { showModal, showNotification, showStatement } from '../../actions/app';
import { reloadDiscussion } from '../../actions/async';
import { Option, OptionsList } from '../options';
import {
  MODAL_STATEMENT, STATEMENT_STATUS_ACTIVE, STATEMENT_STATUS_HIDDEN,
  VIEW_DISCUSSION_DETAIL, MODAL_DELETE_STATEMENT
} from '../../constants';
import i18next from 'i18next';
import { UseWording, UseNotifyWording } from '../../utils';
import { CAutoHeightAnimator } from '../../components/common/atoms';


const SurveyStatementItemWrapper = (Statement, StatementDetail) => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.statement.status,
      showDetail: false
    };
    this.openStatement = this.openStatement.bind(this);
    this.hideStatement = this.hideStatement.bind(this);
    this.flagStatement = this.flagStatement.bind(this);
    this.getTitle = this.getTitle.bind(this);
  }

  static propTypes = {
    statement: PropTypes.object.isRequired,
  }
  componentDidUpdate(prevProps, prevState) {

  }

  openStatement(e) {
    if (e) {
      e.preventDefault();
    }
    let { dispatch, statement } = this.props;
    window.brabbl.statementId = statement.id
    window.history.pushState({page: 'discussion-detail'},
                              'discussion-detail', 
                              "?articleId="+window.brabbl.articleId+
                              "&statementId="+statement.id+
                              "&view="+VIEW_DISCUSSION_DETAIL
                              +"#brabbl-widget")
    dispatch(showStatement(statement.id));
  }
  expandStatement = (e) => {
    this.setState({showDetail: !this.state.showDetail}, ()=>{
      this.animator.animate()
    })

  }

  hideStatement() {
    let { dispatch, statement } = this.props;
    let articleId = window.brabbl.articleId;
    if(this.props.app) {
      articleId = this.props.app.articleId;
    } 
    let status = this.state.status === STATEMENT_STATUS_HIDDEN ? STATEMENT_STATUS_ACTIVE : STATEMENT_STATUS_HIDDEN;
    API.change_statement_status(statement.id, status).then(() => {
      dispatch(reloadDiscussion(articleId));
    }).then(() => {
      this.setState({ 'status': status });
    });
  }

  deleteStatement = (statementId) => {
      this.props.dispatch(showModal(MODAL_DELETE_STATEMENT, { ...this.props, statementId: statementId }))
  }

  flagStatement() {
    let { dispatch, statement, app } = this.props;
    let articleId = window.brabbl.articleId;
    API.flag({ type: 'statement', 'id': statement.id }).then(() => {
      dispatch(
        showNotification(UseNotifyWording(this.props, 'notification_report_posted'))
      );
      dispatch(reloadDiscussion(app.articleId));
    });
  }
  getTitle() {
    return (
      <div>
        <h3 className="discussion-list-item-title">
            {this.props.statement.statement}
        </h3>
      </div>
    );
  }

  getOptionsList() {
    let { is_editable: isEditable, is_deletable: isDeletable, statement, image, video, status } = this.props.statement;
    let { dispatch } = this.props;
    let deleteOption, hideOption, editOption,
      optionsList,
      flagOption;
    if (!isEditable && !isDeletable && status === STATEMENT_STATUS_HIDDEN) {
      return null
    }
    if (isDeletable) {
      deleteOption = (
        <Option
          icon="trash"
          onClick={() => { this.deleteStatement(this.props.statement.id) }}
        >
          { i18next.t('key_survey-statement-options_delete') }
        </Option>
      );
    }
    if(isEditable) {
      hideOption = (
        <Option
          icon="eye-slash"
          onClick={this.hideStatement}
        >
          { i18next.t((status === STATEMENT_STATUS_HIDDEN ? 
                      'key_survey-statement-options_show'
                      : 'key_survey-statement-options_hide')) }
        </Option>
      );
    }
    if (status === STATEMENT_STATUS_HIDDEN) {
      flagOption = '';
    } else {
      flagOption = (
        <Option
          icon="flag-o"
          onClick={this.flagStatement}
        >
          { i18next.t('key_survey-statement-options_report') }
        </Option>
      );
    }
    if (isEditable) {
      editOption = (
        <Option
        icon="pencil"
        onClick={() => dispatch(
          showModal(
            MODAL_STATEMENT, {
              statement: statement,
              image: image,
              video: video,
              statementId: this.props.statement.id,
              pdfs: this.props.statement.pdfs,
              description: this.props.statement.description,
              copyright_info: this.props.statement.copyright_info
            }))}
        >
          { i18next.t('key_survey-statement-options_edit') }
        </Option>
      )
    }

    optionsList = (
      <OptionsList>
        {editOption}
        {deleteOption}
        {hideOption}
        {flagOption}
      </OptionsList>
    );
    return optionsList;
  }

  render() {
    let { statement } = this.props;
    return (
      <CAutoHeightAnimator
        ref={(instance) => {this.animator = instance}}
        divToAnimate={this.props.statement.id + '-statement-item-container'} 
        id={this.props.statement.id + 'auto-height'}
        transitionDelay="500">
      <div id={this.props.statement.id + '-statement-item-container'} className={"statement-item-container"}>
        <Statement
          { ...this.props }
          statement={statement}
          barometerActive
          id={this.props.statement.id}
          title={this.getTitle()}
          handleStatementClick={() => {this.expandStatement()}}
          optionsList={this.getOptionsList()}
          showDetail={this.state.showDetail}
        />
        {
          this.state.showDetail &&
          <StatementDetail
            { ...this.props }
            statement={statement}
            statementId={statement.id}
          />
        }

      </div>
      </CAutoHeightAnimator>
    );
  }
};


export default SurveyStatementItemWrapper;
