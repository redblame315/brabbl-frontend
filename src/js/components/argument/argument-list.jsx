import React from 'react';
import PropTypes from 'prop-types';
import Argument from './argument';
import ArgumentButtons from './argument-buttons';
import { DropDown, DropDownItem } from '../dropdown';
import { BY_DATE, BY_RELEVANCE, BY_USER_RATING, MSG_ORDER_BY_DATE,
    MSG_ORDER_BY_AVERAGE_RATING, MSG_ORDER_BY_USER_RATING,
    DISCUSSION_HAS_NOT_STARTED } from '../../constants';
import { reloadDiscussion, fetchArgument } from '../../actions/async';
import { setArgumentSorting, setArgumentLimit } from '../../actions/app';
import i18next from 'i18next';
import BaseDetailView from '../base-detail-view';
import FlipMove from 'react-flip-move';

class ArgumentListHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ordering: BY_RELEVANCE,
    };
  }

  setSorting = (ordering) => {
    if(!ordering) {
      ordering = this.state.ordering || BY_RELEVANCE;
    } else {
      this.setState({ordering: ordering})
    }

    let { dispatch, argument } = this.props;
    let articleId = window.brabbl.articleId;
    if(this.props.app) {
      articleId = this.props.app.articleId;
    } 
    dispatch(setArgumentSorting(ordering));
    dispatch(reloadDiscussion(articleId));
    if (argument) {
      dispatch(fetchArgument(argument.id));
    }
  }

  render() {
    let { user, args, discussion } = this.props;
    let userRatingFilter,
      buttons,
      listHeader;

    if (user) {
      userRatingFilter = (
        <DropDownItem onSelect={() => this.setSorting(BY_USER_RATING)}>
          { i18next.t(MSG_ORDER_BY_USER_RATING) }
        </DropDownItem>
      );
    }

    if (discussion.has_arguments) {
      buttons = (
        <ArgumentButtons
          {...this.props}
          layout="links"
        />
      );
    }

    if (args.length > 0) {
      listHeader = (
        <DropDown className="argument-sorting">
          <DropDownItem onSelect={() => this.setSorting(BY_RELEVANCE)}>
            { i18next.t(MSG_ORDER_BY_AVERAGE_RATING) }
          </DropDownItem>
          <DropDownItem onSelect={() => this.setSorting(BY_DATE)}>
            { i18next.t(MSG_ORDER_BY_DATE) }
          </DropDownItem>
          {userRatingFilter}
        </DropDown>
      );
    } else {
      let empty_list_text;
      if (this.props.discussion_status === DISCUSSION_HAS_NOT_STARTED) {
        empty_list_text = i18next.t('The discussion has not started yet');
      } else {
        empty_list_text = i18next.t('No arguments yet') + '. ' + i18next.t('Start the discussion now!');
      }
      listHeader = (
        <div className="argument-empty-list">
          { empty_list_text }
        </div>
      );
    }

    return (
      <div className="argument-list-header">
        {buttons}
        {listHeader}
      </div>
    );
  }
}

ArgumentListHeader.propTypes = {
  discussion: PropTypes.object.isRequired,
  discussion_status: PropTypes.string.isRequired,
  app: PropTypes.object,
  argument: PropTypes.object,
  user: PropTypes.object,
  args: PropTypes.array.isRequired,
};

class ArgumentList extends BaseDetailView {

  increaseLimit() {
    this.props.dispatch(setArgumentLimit(this.props.limit + 10));
  }

  render() {
    let showMoreLink,
      buttons;
    let { user, args, discussion, ordering, limit } = this.props;
    let showMore = false;

    // order arguments
    args = args.sort((a, b) => b.id - a.id);
    args = args.sort((a, b) => b.rating.rating - a.rating.rating);
    if (ordering === BY_DATE) {
      args.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    if (ordering === BY_USER_RATING) {
      args = args.filter(arg => typeof arg.rating.user_rating !== 'undefined');
      args = args.sort((a, b) => b.rating.user_rating - a.rating.user_rating);
    }

    let argumentList = args.slice(0, limit).map(arg =>
      <Argument
        key={arg.id}
        arg={arg}
        user={user}
        onRateArgument={() => {
          if( this.ArgumentListHeader ) {
            this.ArgumentListHeader.setSorting();
          }}}
        {...this.props}
        discussion_status={this.state.discussion_status}
      />
    );

    let argumentListPro = argumentList.filter(a => a.props.arg.is_pro);
    let argumentListCon = argumentList.filter(a => !a.props.arg.is_pro);
    if (showMore) {
      showMoreLink = (
        <div className="argument-list-more">
          <button onClick={this.increaseLimit}>
            { i18next.t('Show more arguments') }
          </button>
        </div>
      );
    }
    if (discussion.has_arguments) {
      buttons = (
        <ArgumentButtons
          {...this.props}
          discussion_status={this.state.discussion_status}
          layout="button"
        />
      );
    }
    return (
      <div className="argument-list">
        <ArgumentListHeader
          ref={(instance) => {this.ArgumentListHeader = instance}}
          discussion_status={this.state.discussion_status}
          {...this.props}
        />
        <div className="argument-list-items-all">
          <FlipMove>
          {argumentList}
          </FlipMove>
        </div>
        <div className="argument-list-items-con">
          <FlipMove>
          {argumentListCon}
          </FlipMove>
        </div>
        <div className="argument-list-items-pro">
          <FlipMove>
          {argumentListPro}
          </FlipMove>
        </div>
        {showMoreLink}
        {buttons}
      </div>
    );
  }
}

ArgumentList.propTypes = {
  user: PropTypes.object,
  app: PropTypes.object,
  discussion: PropTypes.object.isRequired,
  args: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired,
  ordering: PropTypes.string.isRequired,
  discussion_status: PropTypes.string.isRequired,
};

export default ArgumentList;
