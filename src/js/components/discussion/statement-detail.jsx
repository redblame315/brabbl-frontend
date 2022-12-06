import React from 'react';
import PropTypes from 'prop-types';
import { ArgumentList } from '../argument';
import BaseDetailView from '../base-detail-view';

class StatementDetail extends BaseDetailView {

  render() {
    let { discussion, app, isShow } = this.props;
    let { argumentOrder, argumentLimit } = app;
    let main_statement = discussion.statements.sort((a, b) => a.id - b.id)[0];
    let default_statement = { arguments: [], created_at: '', created_by: '' };
    let statement = this.props.statement || main_statement || default_statement;
    let args = statement.arguments;
    let argumentList;
   
    if (discussion.has_arguments) {
      argumentList = (
        <ArgumentList
          {...this.props}
          args={args}
          ordering={argumentOrder}
          limit={argumentLimit}
          statement={statement}
          discussion_status={this.state.discussion_status}
        />
      );
    }

    return (
      <div className={"statement-detail"}>
        {argumentList}
      </div>
    );
  }
}
StatementDetail.propTypes = {
  discussion: PropTypes.object.isRequired,
  statement: PropTypes.object,
  app: PropTypes.object,
  title: PropTypes.string,
};
export default StatementDetail;
