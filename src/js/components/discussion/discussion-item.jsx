import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Barometer from './barometer';
import LazyLoad from 'react-lazy-load';
import i18next from 'i18next';
import { UseWording, UseNotifyWording } from '../../utils';
import {
  MODAL_MEDIA, MEDIA_TYPE_IMAGE, MEDIA_TYPE_YOUTUBE, STATEMENT_STATUS_HIDDEN,
} from '../../constants';
import DiscussionTimeLeft from './discussion-time-left';
import AvatarContainer from '../avatar-container';
import { CImageLoader } from '../common/atoms';
import { showModal } from '../../actions/app';

class DiscussionItem extends React.Component {
  getMediaThumb = () => {
    let { dispatch, statement } = this.props;
    if (statement.image && statement.image.original) {
      if (statement.status === STATEMENT_STATUS_HIDDEN) {
        return;
      }
      let media_type,
        video_icon,
        thumbnail_url,
        original_url,
        url;
      if ('video' in statement && statement.video) {
        media_type = MEDIA_TYPE_YOUTUBE;
        url = statement.video;
        original_url = statement.video;
        thumbnail_url = statement.video;
        video_icon = (<i className="fa fa-play-circle-o"></i>);
      } else if ('image' in statement && statement.image) {
        media_type = MEDIA_TYPE_IMAGE;
        url = statement.image.big;
        original_url = statement.image.original;
        thumbnail_url = statement.image.medium;
      }
      let class_name = 'modal-media-button media-' + media_type;
      return (<div className="discussion-list-item-thumbnail">
        <a className={class_name + " statement-thumbnail desktop-only-block"}
            onClick={
              (e) => {
                if(this.props.handleStatementClick) {
                  this.props.handleStatementClick(e)
                }
              }}
          >
          <LazyLoad>
            <CImageLoader src={thumbnail_url} />
          </LazyLoad>
          {video_icon}
        </a>
        <a className={class_name + " statement-thumbnail mobile-only-block"}
            onClick={
              (e) => {
                if(this.props.handleStatementClick) {
                  this.props.handleStatementClick(e)
                }
              }}>
          <LazyLoad>
            <CImageLoader src={url} />
          </LazyLoad>
          {video_icon}
        </a>
      </div>);
    }
    return;
  }
  renderDescription = (description) => {
    let { status } = this.props.statement;
    if (status === STATEMENT_STATUS_HIDDEN) {
      return null
    }
    if(description) {
      description = description.replaceAll('**', '')
    }
    return <div className="list-item-description">
      {description}
    </div>
  }
  renderDiscussionStatus = (hasBarometer) => {
    let current_date = moment().add(15, 'seconds').utc();
    let { start_time, end_time } = this.props.statement;
    //it shows only when discussion item
    if (this.props.discussion_status) {
      return null
    }

    if (start_time) {
      start_time = moment.utc(start_time);
    }
    if (end_time) {
      end_time = moment.utc(end_time);
    }

    let discussion_status
    if (end_time && end_time <= current_date) {
      discussion_status = i18next.t('key_discussion_status_completed');
    } else if (start_time && start_time >= current_date) {
      discussion_status = i18next.t('key_discussion_status_not_started');
    } else if ((current_date > start_time || !start_time) && (current_date <= end_time || !end_time)) {
      discussion_status = i18next.t('key_discussion_status_started');
    }
    return <div className="discussion-status-text"
                style={{marginTop: hasBarometer ? '24px' : '0px'}}>
      {discussion_status}
    </div>
  }

  render() {
    let { barometer, created_at, image_url, url, statement_count, status, author, description } = this.props.statement;
    let { barometerActive, optionsList, title, handleStatementClick } = this.props;
    let timeAgo = status === STATEMENT_STATUS_HIDDEN ? '' : moment(created_at).fromNow();
    let statement_text = statement_count === 1 ? 'survey_statement' : 'survey_statements';

    if (barometer) {
      let { rating, user_rating, count, wording } = barometer;
      let className = 'discussion-list-item-barometer';
      if (status === STATEMENT_STATUS_HIDDEN) {
        barometerActive = false;
        title = (
          <div className="hidden-text-body non-active">
            <h4>{UseNotifyWording(this.props, 'hidden_posting_title')}</h4>
            <div>{UseNotifyWording(this.props, 'hidden_posting_body')}</div>
          </div>
        );
      }

      if (!barometerActive) {
        className += ' no-handle';
        barometer = '';
      } else {
        if (!this.props.discussion_status) {
          className += ' no-handle';
        }
        barometer = (
          <div className={className}>
            <Barometer
              {...this.props}
              disabled={!barometerActive}
              ratingAverage={rating}
              ratingUser={user_rating}
              ratingsTotal={count}
              wording={wording}
              discussion_status={this.props.discussion_status}
            />
          </div>
        );
      }
    }

    const handleClick = (e) => {
      if (status === STATEMENT_STATUS_HIDDEN) {
        return;
      }
      if (e && (e.target.className.indexOf('discussion-list-item') > -1 ||
                e.target.className.indexOf('list-item-description') > -1 ||
                e.target.className.indexOf('avatar') > -1) ||
                e.target.className.indexOf('modal-media-button') > -1 ||
                e.target.className.indexOf('statement-thumbnail') > -1) {
        handleStatementClick(e);
      }

    };
    let discussion_timeleft;
    if (!('articleId' in this.props)) {
      discussion_timeleft = <DiscussionTimeLeft discussion={this.props.statement} />;
    }
    let argument_count = ''
    if (this.props.statement &&
        this.props.statement.arguments && 
        this.props.statement.arguments.length > 0) {
      argument_count = ' ('+this.props.statement.arguments.length + ' ' +
            i18next.t('arguments') + ')'
    }
    if (!barometer && statement_count) {
      argument_count =  ' ('+statement_count + ' ' +
                        UseWording(this.props, statement_text)+ ')'
    }

    return (
      <div
        id={'statement-' + this.props.id}
        onClick={(e) => handleClick(e)}
        className={
          'discussion-list-item'
          + (barometer ? ' has-barometer' : '')
          + (optionsList ? ' has-options' : '')
        }
      >
        {optionsList}
        <div className="discussion-list-item-content">
          {this.getMediaThumb()}
          <div className="discussion-list-item-content-container">
            <div className="mobile-only">
              <AvatarContainer user={author} size={26} date={created_at} dateFormat="DD.MM.YYYY HH:mm" dateonly/>
            </div>
            <p className="discussion-list-item-tags"></p>

            <div className="desktop-only">
              <AvatarContainer user={author} size={26} date={created_at} dateFormat="DD.MM.YYYY HH:mm" dateonly/>
            </div>
            {title}
            {this.renderDescription(description)}
            {
              status !== STATEMENT_STATUS_HIDDEN &&
              <div className="more-link-container" onClick={(e) => handleStatementClick(e) }>
                <a className="more-link" >
                  {i18next.t('statement-list-item_more-button-title') +
                  argument_count}
                </a>
              </div>

            }
          </div>

        </div>
        {
          <div className="discussion-list-item-footer">
            { 
              barometer &&
              <div className="discussion-list-item-barometer-container">
                {barometer}
              </div>
            }
            <div className="desktop-only">
              {this.renderDiscussionStatus(barometer && true)}
            </div>
          </div>
        }

        <div className="mobile-only">
          {this.renderDiscussionStatus()}
        </div>
      </div>
    );
  }
}

DiscussionItem.propTypes = {
  user: PropTypes.object,
  optionsList: PropTypes.object,
  title: PropTypes.object.isRequired,
  discussion_status: PropTypes.string,
  id: PropTypes.any,
  customer: PropTypes.object.isRequired,
  statement: PropTypes.object.isRequired,
  handleStatementClick: PropTypes.func.isRequired,
  barometerActive: PropTypes.bool,
  status: PropTypes.string,
};

export default DiscussionItem;
