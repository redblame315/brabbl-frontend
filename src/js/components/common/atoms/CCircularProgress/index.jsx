import React from 'react';
import PropTypes from 'prop-types';

function CircularProgressWithLabel(props) {
  return (
    <span className="progress">
      <i className="fa fa-spinner fa-spin"></i> {Math.round(props.value)}%
    </span>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default CircularProgressWithLabel