import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Discussion,
  SurveyList } from '../discussion';

const DetailView = (props) => {
  let { discussion } = props;
  if (!discussion) {
    return null
  }

  if (discussion.multiple_statements_allowed) {
    return <SurveyList {...props} />;
  }

  return <Discussion {...props} />;
};

DetailView.propTypes = {
  user: PropTypes.object,
  discussion: PropTypes.object,
  customer: PropTypes.object.isRequired,
  articleId: PropTypes.string.isRequired,
  statementId: PropTypes.number,
  argumentId: PropTypes.number,
};

const mapStateToProps = (state) => ({
  discussion: state.discussion,
});

export default connect(mapStateToProps)(DetailView);
