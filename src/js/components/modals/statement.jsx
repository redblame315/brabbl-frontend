import React from 'react';
import PropTypes from 'prop-types';
import { StatementFormContainer } from '../forms';
import { hideModal, showModal } from '../../actions/app';
import { reloadDiscussion } from '../../actions/async';
import { UseWording } from '../../utils';
import i18next from 'i18next';

class StatementModal extends React.Component {

  onSubmit = (resp) => {
    let articleId = window.brabbl.articleId;
    if(this.props.app) {
      articleId = this.props.app.articleId;
    } 
    this.props.dispatch(reloadDiscussion(articleId));
    //location.hash = `statement-${resp.data.id}`;
  }

  onCancel = (e) => {
    e.preventDefault();
    this.props.dispatch(hideModal());
  }

  render() {
    let { customer, discussion, initial_data } = this.props;
    let title = (
      <h1>
        {initial_data.statement ? i18next.t('Edit suggestion') : UseWording(
          this.props, 'survey_add_answer_button_bottom'
        )}
      </h1>
    );
    return (
      <div className="fullform discussion-create">
        <StatementFormContainer
          customer={customer}
          discussion={discussion}
          title={title}
          initial_data={initial_data}
          handleSubmit={this.onSubmit}
          handleCancel={this.onCancel}
        />
      </div>
    );
  }
}

StatementModal.propTypes = {
  user: PropTypes.object.isRequired,
  customer: PropTypes.object.isRequired,
  discussion: PropTypes.object.isRequired,
  initial_data: PropTypes.object,
};

export default StatementModal;
