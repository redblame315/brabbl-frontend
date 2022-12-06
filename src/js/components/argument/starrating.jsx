import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import { showModal } from '../../actions/app';
import i18next from 'i18next';
import { UseWording } from '../../utils';
import { DISCUSSION_STARTED } from '../../constants';

/**
 * @fileoverview react-star-rating
 * @author @cameronjroe
 * <StarRating
 *   name={string} - name for form input (required)
 *   caption={string} - caption for rating (optional)
 *   ratingAmount={number} - the rating amount (required, default: 5)
 *   rating={number} - a set rating between the rating amount (optional)
 *   disabled={boolean} - whether to disable the rating from being selected (optional)
 *   editing={boolean} - whether the rating is explicitly in editing mode (optional)
 *   size={string} - size of stars (optional)
 *   onRatingClick={function} - a handler function that gets called onClick of the rating (optional)
 *   />
 */

const STAR = '\u2605';

class StarRating extends React.Component {

  constructor(props) {
    super(props);
    // initialize touch events
    // TODO reenable with updated version!
    // React.initializeTouchEvents(true);

    this.state = {
      ratingCache: {
        pos: 0,
        userPos: 0,
        rating: null,
        userRating: null,
      },
      stars: 5,
      rating: null,
      userRating: null,
      pos: 0,
      userPos: 0,
      glyph: this.getStars(),
      tooltip: false,
    };

    this.tooltips = {
      1: UseWording(props, 'rating_1'),
      2: UseWording(props, 'rating_2'),
      3: UseWording(props, 'rating_3'),
      4: UseWording(props, 'rating_4'),
      5: UseWording(props, 'rating_5'),
    };
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.min = 0;
    this.max = this.props.ratingAmount || 5;
    this.updateState(this.props);
  }

  componentDidMount() {
    this.root = findDOMNode(this.refs.root);
    this.ratingContainer = findDOMNode(this.refs.ratingContainer);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps !== this.props) {
      this.updateState(nextProps);
    }
    return true;
  }

  componentWillUnmount() {
    delete this.root;
    delete this.ratingContainer;
  }

  getPosition(e) {
    return e.pageX - this.root.getBoundingClientRect().left;
  }

  /**
   * Gets the stars based on ratingAmount
   * @return {string} stars
   */
  getStars() {
    let stars = '';
    let numRating = this.props.ratingAmount;
    for (let i = 0; i < numRating; i++) {
      stars += STAR;
    }
    return stars;
  }

  getDecimalPlaces(num) {
    let match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return !match ? 0 : Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  }

  getWidthFromValue(val) {
    let min = this.min,
      max = this.max;
    if (val <= min || min === max) {
      return 0;
    }
    if (val >= max) {
      return 100;
    }
    return (val - min) * 100 / (max - min);
  }

  getValueFromPosition(pos) {
    let val;
    let precision = this.getDecimalPlaces(this.props.step);
    let maxWidth = this.ratingContainer.offsetWidth;
    let diff = this.max - this.min;
    let factor = (diff * pos) / (maxWidth * this.props.step);
    factor = Math.ceil(factor);
    val = this.applyPrecision(parseFloat(this.min + factor * this.props.step), precision);
    val = Math.max(Math.min(val, this.max), this.min);
    return val;
  }

  getRatingFromPosition(pos) {
    let val = this.getValueFromPosition(pos);
    return Math.max(1, Math.ceil(val));
  }

  getStarRatingPosition(val) {
    let width = this.getWidthFromValue(val) + '%';
    return width;
  }

  getRatingPosition(val) {
    let left = val * 20;
    left += '%';
    return left;
  }

  getRatingEvent(e) {
    let left,
      pos = this.getPosition(e),
      val = this.getRatingFromPosition(pos);

    left = this.getRatingPosition(val);

    return { left, val };
  }

  applyPrecision(val, precision) {
    return parseFloat(val.toFixed(precision));
  }

  updateState({ userRating }) {
    if (userRating) {
      let rating = Math.ceil(userRating);
      let ratingPos = this.getRatingPosition(rating);
      this.state.ratingCache.userRating = rating;
      this.state.ratingCache.userPos = ratingPos;
      this.state.ratingCache.pos = ratingPos;

      this.setState({
        ratingCache: this.state.ratingCache,
        userRating: rating,
        userPos: this.state.ratingCache.userPos,
        pos: this.state.ratingCache.userPos,
      });
    }
  }

  handleMouseLeave() {
    this.setState({
      pos: this.state.ratingCache.userPos,
      userPos: this.state.ratingCache.userPos,
      userRating: this.state.ratingCache.userRating,
      tooltip: false,
    });
  }

  handleMouseMove(e) {
    // get hover position
    if (!this.props.disabled) {
      let ratingEvent = this.getRatingEvent(e);
      this.updateRating(
        ratingEvent.left,
        ratingEvent.val
      );
    }
  }

  updateRating(left, val) {
    this.setState({
      pos: left,
      userPos: left,
      userRating: val,
      tooltip: true
    });
  }

  handleClick(e) {
    let { editing, dispatch, discussion_status } = this.props;
    if (discussion_status !== DISCUSSION_STARTED) {
      return false;
    }
    if (!editing) {
      dispatch(showModal('LOGIN'));
      return false;
    }
    let ratingCache;
    if (this.props.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }

    ratingCache = {
      pos: this.state.pos,
      rating: this.state.rating,
      userPos: this.state.userPos,
      userRating: this.state.userRating,
      caption: this.props.caption,
      name: this.props.name,
    };

    this.setState({ ratingCache: ratingCache });
    this.props.onRatingClick(e, ratingCache);
  }

  render() {
    let caption = null;
    let classes = cx({
      'react-star-rating__root': true,
      'rating-disabled': this.props.disabled,
      ['react-star-rating__size--' + this.props.size]: this.props.size,
      'rating-editing': this.props.editing,
    });
    // are we editing this rating?
    let starRating,
      tooltipBlock;
    let isRatedClass = 'rated-' + (this.state.userRating !== null);
    let isEditingClass = 'editing-' + (this.props.editing === true);
    let containerClass = 'rating-container rating-gly-star ' + isRatedClass + ' ' + isEditingClass;

    // is there a caption?
    if (this.props.caption) {
      caption = (<span className="react-rating-caption">{this.props.caption}</span>);
    }

    let tooltipPos = 0,
      tooltip = '\u00a0';
    if (this.props.editing) {
      tooltipPos = (this.state.userRating - 1) * 20 - 10;
      tooltipPos += '%';
    }
    if (this.state.userRating) {
      let userRating = Math.ceil(this.state.userRating);
      tooltip = this.tooltips[userRating].replace(/ /g, '\u00a0');
    }

    if (this.props.editing) {
      if (!this.props.disabled && this.state.tooltip) {
        tooltipBlock = (<div className="tooltip" style={{ left: tooltipPos }}>{tooltip}</div>);
      }
      starRating = (
        <div
          ref="ratingContainer"
          className={containerClass}
          data-content={this.state.glyph}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
        >
          {tooltipBlock}
          <div className="rating-stars" data-content={this.state.glyph} style={{ width: this.state.pos }}></div>
          <div className="rating-user" style={{ left: this.state.userPos }}></div>
        </div>
      );
    } else {
      starRating = (
        <div
          ref="ratingContainer"
          onClick={this.handleClick}
          className={containerClass}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          data-content={this.state.glyph}
        >
          <div className="rating-stars" data-content={this.state.glyph} style={{ width: this.state.pos }}></div>
        </div>
      );
    }

    return (
      <div className="react-star-rating">
        {caption}
        <div ref="root" className={classes}>
          {starRating}
        </div>
        <p>{ i18next.t('Rate') }</p>
      </div>
    );
  }
}

StarRating.propTypes = {
  name: PropTypes.string.isRequired,
  caption: PropTypes.string,
  ratingAmount: PropTypes.number.isRequired,
  rating: PropTypes.number,
  userRating: PropTypes.number,
  onRatingClick: PropTypes.func,
  disabled: PropTypes.bool,
  editing: PropTypes.bool,
  step: PropTypes.number,
  size: PropTypes.string,
  user: PropTypes.object,
  discussion_status: PropTypes.string,
};

StarRating.defaultProps = {
  step: 1,
  ratingAmount: 5,
  onRatingClick() {},
  disabled: false,
};

export default StarRating;
