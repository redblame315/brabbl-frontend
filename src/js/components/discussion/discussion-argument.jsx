import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { ArgumentList } from '../argument';
import { showStatement } from '../../actions/app';
import i18next from 'i18next';

class ArgumentDiscussion extends React.Component {

  getStatement = (statementId) => this.props.discussion.statements.filter(stat => stat.id === statementId)[0]

  showStatement = () => {
    this.props.dispatch(showStatement(this.props.statementId));
  }

  render() {
    let { discussion, argument, app } = this.props;
    let statement = this.getStatement(argument.statement_id);
    let { argumentOrder, argumentLimit } = app;
    let time_ago = moment(argument.created_at).fromNow();
    let argType = argument.is_pro ? 'Pro' : 'Contra';
    return (
      <div>
        <div className="back-link" onClick={this.showStatement}>
          <i className="fa fa-long-arrow-left"></i>
          <span>{statement.statement || discussion.statement}</span>
        </div>
        <div className="discussion-body">
          <div className="discussion-meta-header">
            <div className="argument-type">
              { i18next.t(argType + '-Argument') }
            </div>
            <h2 className="argument-title">{argument.title}</h2>
            <p>{argument.text}</p>
            <span>
              { i18next.t('by') } {argument.created_by}, {time_ago}
            </span>
          </div>
          <div className="discussion-socialsharing"></div>
          <ArgumentList
            {...this.props}
            args={argument.replies}
            statement={statement}
            argument={argument}
            ordering={argumentOrder}
            limit={argumentLimit}
          />
        </div>
      </div>
    );
  }
}

ArgumentDiscussion.propTypes = {
  discussion: PropTypes.object.isRequired,
  argument: PropTypes.object,
  app: PropTypes.object,
  statementId: PropTypes.number,
  argumentId: PropTypes.number,
};

const mapStateToProps = (state) => ({
  argument: state.argument,
  discussion: state.discussion,
});

export default connect(mapStateToProps)(ArgumentDiscussion);
