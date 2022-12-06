import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import ReactSlider from 'react-slider';
import { showModal, showNotification } from '../../actions/app';
import { reloadDiscussion } from '../../actions/async';
import { UserHasPermission } from '../../utils';
import { CAN_CHANGE_USER } from '../../constants';
import {
  DISCUSSION_STARTED, DISCUSSION_COMPLETED, DISCUSSION_HAS_NOT_STARTED,
  BAROMETER_BEHAVIOR_ALWAYS_SHOW, BAROMETER_BEHAVIOR_ONLY_FOR_VOTED_USER,
  BAROMETER_BEHAVIOR_ONLY_FOR_VOTED_USER_OR_ADMIN
} from '../../constants';
import API from '../../api';
import i18next from 'i18next';
import MarkupWording from '../markup_wording';
import { UseNotifyWording } from '../../utils';

const MAX_CHART_LINE = 20;
const CHART_LINE_STEP_COUNT = 5;

class Barometer extends React.Component {
  constructor(props) {
    super(props);
    let statementTitle = this.props.statement && this.props.statement.statement;
    if (!statementTitle || statementTitle == '') {
      statementTitle = this.props.discussion.statement
    }
    this.state = {
      cache: {
        ratingUser: this.props.ratingUser,
        ratingAverage: this.props.ratingAverage,
        ratingsTotal: this.props.ratingsTotal,
        countRatings: this.props.countRatings || this.props.statement.barometer.count_ratings,
      },
      wordingDict: this.buildWordingDict(this.props.wording),
      visibleTooltip: null,
      ratingUser: this.props.ratingUser,
      ratingAverage: this.props.ratingAverage,
      ratingsTotal: this.props.ratingsTotal,
      countRatings: this.props.countRatings || this.props.statement.barometer.count_ratings,
      statementTitle
    };
  }

  componentDidMount() {
    this.slideContainer = findDOMNode(this.refs.sliderContainer);
    this.slideContainer.addEventListener('mousemove', this.onBarometerHover);
    this.slideContainer.addEventListener('mouseleave', this.onBarometerLeave);
  }

  // TODO update cache if necessary
  shouldComponentUpdate(nextProps) {
    if (nextProps.ratingUser != this.props.ratingUser ||
        nextProps.ratingAverage != this.props.ratingAverage ||
        nextProps.ratingsTotal != this.props.ratingsTotal ||
        nextProps.countRatings != this.props.countRatings) {
      this.state.cache.ratingUser = nextProps.ratingAverage;
      this.state.cache.ratingAverage = nextProps.ratingAverage;
      this.state.cache.ratingsTotal = nextProps.ratingsTotal;
      this.state.cache.countRatings = nextProps.countRatings || nextProps.statement.barometer.count_ratings;
      
      this.setState({
        cache: this.state.cache,
        ratingUser: nextProps.ratingUser,
        ratingAverage: nextProps.ratingAverage,
        ratingsTotal: nextProps.ratingsTotal,
        countRatings: nextProps.countRatings || nextProps.statement.barometer.count_ratings,
        statementTitle: nextProps.statement && nextProps.statement.statement,
      });
      return true;
    } else {
      // TODO test next state against cache
      return true;
    }
  }

  componentWillUnmount() {
    this.slideContainer.removeEventListener('hover', this.onBarometerHover);
    // this.slideContainer.removeEventListener('mouseleave', this.onBarometerLeave);
    this.slideContainer.removeEventListener('mouseenter', this.onBarometerEnter);
    this.slideContainer.removeEventListener('mousedown', this.onBarometerDown);
  }

  onBarometerHover = (e) => {
    e.stopPropagation();
    if (e.target.className === 'barometer-slider') {
      let sliderWidth = e.target.offsetWidth;
      let mousePos = e.pageX - e.target.getBoundingClientRect().left;
      let currentPercentage = Math.round(100 / sliderWidth * mousePos);
      let chunkSize = 100 / (this.props.sliderMinMax * 2);
      let step = Math.round((currentPercentage) / chunkSize) + 1;
      this.setState({ visibleTooltip: step });
    }
  }

  onBarometerEnter = (e) => {
    e.stopPropagation();
    if (e.target.className === 'barometer-slider') {
      let sliderWidth = e.target.offsetWidth;
      let mousePos = e.pageX - e.target.getBoundingClientRect().left;
      let currentPercentage = Math.round(100 / sliderWidth * mousePos);
      let chunkSize = 100 / (this.props.sliderMinMax * 2);
      let step = Math.round((currentPercentage) / chunkSize) + 1;
      this.setState({ visibleTooltip: step });
    }
  }

  onBarometerDown = (e) => {
    e.stopPropagation();
    setTimeout(this.setVisibleTooltip, 3000);
  }

  onBarometerLeave = (e) => {
    e.stopPropagation();
    setTimeout(this.setVisibleTooltip, 3000);
  }

  setVisibleTooltip = () => {
    this.setState({ visibleTooltip: null });
  }

  buildWordingDict = (wording) => {
    let wordingDict = {};
    if (wording) {
      for (let i = 0; i < wording.length; ++i) {
        if (typeof wording[i] !== 'undefined') {
          wordingDict[wording[i].value] = wording[i].name;
        }
      }
    }
    return wordingDict;
  }

  handleChange = (val) => {
    let ratingAverage,
      mean = this.state.cache.ratingAverage,
      count = this.state.cache.ratingsTotal;

    this.setState({ visibleTooltip: val + 4 });
    if (this.props.user !== null && this.state.cache.ratingUser !== null &&
          typeof this.state.cache.ratingUser !== 'undefined') {
      ratingAverage = mean;
    } else {
      ratingAverage = mean + ((1 / (count + 1)) * (val - mean));
      count += 1;
    }
    this.setState({
      ratingUser: val,
      ratingAverage: ratingAverage,
      ratingsTotal: count,
    });
  }

  handleAfterChange = (val) => {
    let { dispatch, user, app } = this.props;
    let articleId = window.brabbl.articleId;
    if(this.props.app) {
      articleId = this.props.app.articleId;
    } 
    this.setState({ visibleTooltip: val + 4 });
    setTimeout(this.setVisibleTooltip, 3000);
    if (!user) {
      dispatch(showModal('LOGIN'));
      // reset
      this.setState({
        // has not rated yet
        ratingUser: null,
        ratingAverage: this.state.cache.ratingAverage,
        ratingsTotal: this.state.cache.ratingsTotal,
      });
      return;
    }

    // TODO: create a more granular RATE_BAROMETER action
    API.vote_statement(this.props.statement.id, val).then((resp) => {
      let data = resp.data;
      // update cache
      this.state.cache.ratingUser = this.state.ratingAverage;
      this.state.cache.ratingAverage = this.state.ratingAverage;
      this.state.cache.ratingsTotal = this.state.ratingsTotal;
      this.state.cache.countRatings = data.count_ratings;
      this.setState({
        cache: this.state.cache,
        countRatings: data.count_ratings,
      });
      return this.props.dispatch(reloadDiscussion(articleId));
    });
  }

  handleClick = (e) => {
    e.stopPropagation();
    this.props.dispatch(showModal('BAROMETER', this.state));
  }

  handleDisabledDiscussion = () => {
    let { dispatch, discussion_status } = this.props;
    let notification;
    if (discussion_status === DISCUSSION_COMPLETED) {
      notification = UseNotifyWording(this.props, 'notification_discussion_already_completed');
    } else if (discussion_status === DISCUSSION_HAS_NOT_STARTED) {
      notification = UseNotifyWording(this.props, 'notification_discussion_not_started');
    }
    dispatch(showNotification(notification));
  }

  renderSeperators = () => {
    let numSteps = this.props.sliderMinMax * 2;
    let seperators = [];
    for (let i = 0; i <= numSteps; i++) {
      let style = {
        left: 100 / numSteps * (i - 0.5) + '%',
        width: 100 / numSteps + '%'
      };
      seperators.push(
        <span key={i} className="barometer-seperator" style={style}></span>
      );
    }
    return seperators;
  }

  renderSliderMask = () => {
    let { sliderMinMax } = this.props;
    let { ratingAverage } = this.state;
    let width = 50 - (50 / sliderMinMax * Math.abs(ratingAverage));
    let colorClass = 'pos';
    let style = {
      width: width + '%',
    };
    if (ratingAverage < 0) {
      colorClass = 'neg';
    }
    return (
      <div>
        <div className={'barometer-slider-mask-1 ' + colorClass} style={style}></div>
        <div className={'barometer-slider-mask-2 ' + colorClass}></div>
      </div>
    );
  }

  renderTooltips = () => {
    if (!this.props.user) {
      return null;
    }
    let text;
    let numSteps = this.props.sliderMinMax * 2;
    let tooltips = [];
    for (let i = 0; i <= numSteps; i++) {
      let hintStyle = {
        left: 100 / numSteps * i + '%',
        display: (this.state.visibleTooltip === i + 1) ? 'inline-block' : 'none',
      };

      text = this.state.wordingDict[i - this.props.sliderMinMax] || '';
      if (text) {
        tooltips.push(
          <div className="barometer-hint-container" style={hintStyle}>
            <div className="barometer-hint">{text}</div>
          </div>
        );
      }
    }
    return tooltips;
  }
  calculateLineHeight = (countForLine, maxCountForLine) => {
    if(maxCountForLine == 0) return 0
    if(maxCountForLine == 1 && countForLine == 1) return MAX_CHART_LINE / 2
    if(countForLine == maxCountForLine) return MAX_CHART_LINE
    let lineHeight = Math.floor(countForLine / maxCountForLine  * MAX_CHART_LINE)
    return lineHeight
  }
  calculateMaxVoteCountForLine = (countRatings) => {
    if(!countRatings) return 0;
    let maxVoteCount = 0
    for(const value in countRatings) {
      let voteCount = countRatings[value]
      if(voteCount> maxVoteCount) {
        maxVoteCount = voteCount
      }
    }
    return maxVoteCount
  }
  renderOneVoteLine = (index, count, maxCount) => {
    let numSteps = this.props.sliderMinMax * 2;
    let height = this.calculateLineHeight(count, maxCount) + 'px';
    let style = {
      left: 100 / numSteps * (index - 0.5) + '%',
      width: 100 / numSteps + '%',
      height
    };
    let lineClassName = "barometer-chart" + " line"+index;
    return  <span key={index} className={lineClassName} style={style}></span>
  }
  renderVoteChart = () => {
    const { countRatings } = this.state;
    if(!countRatings) return null;
    let numSteps = this.props.sliderMinMax * 2;
    let lines = [];
    let maxCountForLine = this.calculateMaxVoteCountForLine(countRatings)
    for (let i = 0; i <= numSteps; i++) {
      let value = i - this.props.sliderMinMax
     
      lines.push(
        this.renderOneVoteLine(i, countRatings[value + ""], maxCountForLine)
      );
    }
    return lines;
  }
  renderAverageRatingLine = () => {
    const { ratingAverage, ratingsTotal } = this.state;
    if(ratingsTotal == 0) return null
    let numSteps = this.props.sliderMinMax * 2;
    let averageRatingInStep = ratingAverage + this.props.sliderMinMax; 
    let style = {
      left: 100 / numSteps * (averageRatingInStep) + '%',
    };
    return <div className="barometer-average-rating-view"  style={style}>
      <div  >
        <a onClick={this.handleClick} className="barometer-total-votes">
          <span className="barometer-number">
            {ratingsTotal}
          </span>
          <span className="barometer-vote-text">
            { i18next.t('Votes') }
          </span>
        </a>
      </div>
      <span
        className="barometer-number-symbol-avg"
        title={i18next.t('Average opinion')}
      >
        ∅
      </span>
      <div className="barometer-average-rating-line"/>
    </div>
  }

  checkIsShowChart = (ratingsTotal, notYetVoted, is_disabled) => {
    const { user, customer, discussion } = this.props;
    const isAdmin = UserHasPermission(user, CAN_CHANGE_USER, customer);
    if(is_disabled || discussion.barometer_behavior === BAROMETER_BEHAVIOR_ALWAYS_SHOW) {
      return true;
    } else if (discussion.barometer_behavior === BAROMETER_BEHAVIOR_ONLY_FOR_VOTED_USER) {
      return !notYetVoted;
    }
    return (isAdmin && ratingsTotal > 0) || !notYetVoted;
  }
  render() {
    let { ratingsTotal, ratingUser, ratingAverage } = this.state;
    let ratingText = ratingUser;
    let is_disabled = this.props.disabled || this.props.discussion_status !== DISCUSSION_STARTED;
    let showStartSign = false;
    let notYetVoted = false;
    let slider_container_class = is_disabled ? 'barometer-slider-container not-active' : 'barometer-slider-container';
    // only 1 decimals
    ratingAverage = Math.round(ratingAverage * 10) / 10;

    // determine handle text
    if (ratingText !== undefined && ratingText !== null) {
      if(ratingText > 0) {
        ratingText = '+' + ratingText;
      }
      if(this.state.cache.ratingUser == null) {
        notYetVoted = true;
        showStartSign = this.props.showStartSign;
      }
    } else {
      ratingText = '?';
      showStartSign = this.props.showStartSign;
      // reset position
      ratingUser = 0;
      notYetVoted = true;
    }
    const disagreeText = this.state.wordingDict[- this.props.sliderMinMax] || '';
    const agreeText = this.state.wordingDict[this.props.sliderMinMax] || '';
    const isShowChart = this.checkIsShowChart(ratingsTotal, notYetVoted, is_disabled);
    return (
      <div className="barometer-inner-container">
        <div className="barometer-label left">
          {disagreeText}
        </div>
        <div className="barometer" onClick={this.handleDisabledDiscussion}>
          <div className={slider_container_class} ref="sliderContainer">
            <ReactSlider
              className="barometer-slider"
              disabled={is_disabled}
              value={ratingUser}
              min={-this.props.sliderMinMax}
              max={this.props.sliderMinMax}
              onAfterChange={this.handleAfterChange}
              onChange={this.handleChange}
              renderThumb={(props, state) => {
                if(is_disabled) return null
                return <div {...props}>
                <div className={notYetVoted? 'heart-beat-anim-handle' : 'handle'}>
                  <div className={"bubble-background"}></div>
                  <span className={"handle-text"} >{ratingText}</span>
                </div>
                {
                  notYetVoted &&
                  <div className={"bracket-container"}>
                    <span className={"handle-bracket-left"}>{'<'}</span>
                    <span className={"handle-bracket-right"}>{'>'}</span>
                  </div>
                }
            
              </div>
              }}
              withBars
            />
            
            {this.renderSeperators()}
            {this.renderSliderMask()}
            {
              isShowChart &&
              this.renderVoteChart()
            }
            {this.renderTooltips()}
            {
              isShowChart &&
              this.renderAverageRatingLine()
            }
          </div>

          <div className={'barometer-start-sign' + (showStartSign ? ' show' : '')}>
            <MarkupWording {...this.props} wording="barometer_start_sign" />
          </div>
        </div>
        <div className="barometer-label right">
          {agreeText}
        </div>
      </div>
      
    );
  }
}

Barometer.propTypes = {
  app: PropTypes.object,
  user: PropTypes.object,
  sliderMinMax: PropTypes.number,
  disabled: PropTypes.bool,
  statement: PropTypes.object,
  wording: PropTypes.array,
  ratingAverage: PropTypes.number.isRequired,
  ratingsTotal: PropTypes.number.isRequired,
  discussion_status: PropTypes.string.isRequired,
  ratingUser: PropTypes.number,
  showStartSign: PropTypes.bool,
  countRatings: PropTypes.object,
};

Barometer.defaultProps = {
  sliderMinMax: 3
}

export default Barometer;
