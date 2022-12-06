import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import moment from 'moment';
// Generic Countdown Timer UI component
//
// https://github.com/uken/react-countdown-timer
//
// props:
//   - initialTimeRemaining: Number
//       The time remaining for the countdown (in ms).
//
//   - interval: Number (optional -- default: 1000ms)
//       The time between timer ticks (in ms).
//
//   - tickCallback(timeRemaining): Function (optional)
//       A function to call each tick.
//
//   - completeCallback(): Function (optional)
//       A function to call when the countdown completes.
//
class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    // Normally an anti-pattern to use this.props in getInitialState,
    // but these are all initializations (not an anti-pattern).
    let { status_text, remaining } = this.getDateStatus(Date.now());
    this.state = {
      timeRemaining: remaining,
      statusText: status_text,
      timeoutId: null,
      prevTime: null,
    };
    this.displayName = 'CountdownTimer';
  }

  componentDidMount() {
    this.mounted = true;
    this.tick();
  }

  componentDidUpdate() {
    if ((!this.state.prevTime) && this.state.timeRemaining >= 0 && this.mounted) {
      this.tick();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    clearTimeout(this.state.timeoutId);
  }

  getDateStatus = (now) => {
    let current_date = moment.utc(now) ? now : moment().utc(),
      remaining,
      status_text;
    let { start_time, end_time } = this.props.discussion;
    if (start_time) {
      start_time = moment.utc(start_time);
    }
    if (end_time) {
      end_time = moment.utc(end_time);
    }
    if (end_time && end_time < current_date) {
      status_text = i18next.t('Completed');
    } else if (start_time && start_time > current_date) {
      status_text = i18next.t('Starts in');
      remaining = start_time.diff(current_date);
    } else if ((current_date > start_time || !end_time) && current_date <= end_time) {
      status_text = i18next.t('Ends in');
      remaining = end_time.diff(current_date);
    }
    return { status_text, remaining };
  }

  getFormattedString = (statusText, milliseconds) => {
    let timerClass,
      formatted_time;
    if (milliseconds) {
      let totalSeconds = Math.round(milliseconds / 1000);
      let seconds = parseInt(totalSeconds % 60, 10);
      let minutes = parseInt(totalSeconds / 60, 10) % 60;
      let hours = parseInt(totalSeconds / 3600, 10) % 24;
      let days = parseInt(totalSeconds / 86400, 10);
      if (days > 0) {
        days = days + i18next.t('d') + ' ';
        timerClass = '';
      } else {
        days = '';
        timerClass = 'completeSoon';
      }
      hours = (hours < 10 ? '0' + hours : hours) + i18next.t('h');
      minutes = (minutes < 10 ? '0' + minutes : minutes) + i18next.t('m');
      seconds = (seconds < 10 ? '0' + seconds : seconds) + i18next.t('s');
      formatted_time = days + hours + ' ' + minutes + ' ' + seconds;
    }
    return <div id="timer" className={timerClass} >{statusText} {formatted_time}</div>;
  }

  tick = () => {
    let currentTime = Date.now();
    let dt = this.state.prevTime ? (currentTime - this.state.prevTime) : 0;
    let interval = this.props.interval;

    // correct for small variations in actual timeout time
    let timeRemainingInInterval = (interval - (dt % interval));
    let timeout = timeRemainingInInterval;

    if (timeRemainingInInterval < (interval / 2.0)) {
      timeout += interval;
    }

    let timeRemaining = Math.max(this.state.timeRemaining - dt, 0);
    let { status_text } = this.getDateStatus(currentTime);
    let countdownComplete = (status_text === i18next.t('Completed') || this.state.prevTime && timeRemaining <= 0);
    if (countdownComplete) {
      status_text = (<b>{status_text}</b>);
      let { remaining } = this.getDateStatus(currentTime);
      if (remaining > 0) {
        countdownComplete = false;
        timeRemaining = remaining;
      }
    }
    if (this.mounted) {
      if (this.state.timeoutId) { clearTimeout(this.state.timeoutId); }
      this.setState({
        timeoutId: countdownComplete ? null : setTimeout(this.tick, timeout),
        prevTime: currentTime,
        timeRemaining: timeRemaining,
        statusText: status_text,
      });
    }

    if (countdownComplete) {
      if (this.props.completeCallback) { this.props.completeCallback(); }
      return;
    }

    if (this.props.tickCallback) {
      this.props.tickCallback(timeRemaining);
    }
  }

  render() {
    let { statusText, timeRemaining } = this.state;
    return this.getFormattedString(statusText, timeRemaining);
  }
}


CountdownTimer.propTypes = {
  discussion: PropTypes.object.isRequired,
  interval: PropTypes.number,
  tickCallback: PropTypes.func,
  completeCallback: PropTypes.func,
};

CountdownTimer.defaultProps = {
  interval: 1000,
  tickCallback: null,
  completeCallback: null,
};

export default  CountdownTimer;
