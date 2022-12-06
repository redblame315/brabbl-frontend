import React from 'react';
import PropTypes from 'prop-types';
import forms from '../../common/newforms/newforms';
import TagsInput from 'react-tagsinput';
import API from '../../../api';
import { updateFormErrors } from './utils';
import { cutUrlHash } from '../../../utils';
import DiscussionListForm from '../discussion_list';
import i18next from 'i18next';
import { CCircularProgress } from '../../common/atoms';

class DiscussionListFormContainer extends React.Component {

  constructor(props) {
    super(props);
    let { initial_data } = this.props;
    let tags = [];
    let formData = {};
    if (initial_data) {
      tags = initial_data.tags;
    }
    if (this.props.initial_data) {
      tags = this.props.initial_data.tags;
      Object.assign(formData, { data: this.props.initial_data });
    }
    let disc_list_form = DiscussionListForm();
    this.state = {
      forms: {
        discussion_list: new disc_list_form(formData),
      },
      tags: tags,
      show_spinner: false,
      progress: 0
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    let action = 'create';
    let data = {
      tags: this.state.tags,
      url: cutUrlHash(window.location.href),
    };
    if (this.props.initial_data) {
      data = this.props.initial_data;
      action = 'edit';
    }
    this.submitForm(data, action);
  }

  submitForm = (data, action) => {
    let discussionListForm = this.state.forms.discussion_list;

    if (discussionListForm.validate()) {
      this.setState({ 'show_spinner': true, progress: 0 });
      // flatten & merge data
      Object.assign(data, discussionListForm.cleanedData);

      // convert some values to the format expected by the API
      data.tags = this.state.tags;

      // send data
      let createOrUpdate;
      if (action === 'create') {
        createOrUpdate = API.create_discussion_list(data,
          {
            onUploadProgress: progressEvent => {
              this.setState({progress: (progressEvent.loaded * 100) / progressEvent.total})
            }
          });
      } else {
        createOrUpdate = API.update_discussion_list(data.url, data,
          {
            onUploadProgress: progressEvent => {
              this.setState({progress: (progressEvent.loaded * 100) / progressEvent.total})
            }
          });
      }

      createOrUpdate.then(resp => {
        this.props.onSubmit(resp.data);
      })
        .catch(resp => {
          updateFormErrors(discussionListForm, resp);
          this.setState({ 'show_spinner': false, progress: 0 });
          this.forceUpdate();
        });
    } else {
      this.forceUpdate();
    }
  }

  render() {
    let buttonText = this.state.show_spinner ?
                     <CCircularProgress value={this.state.progress}/>
                     : i18next.t('Save List');
    return (
      <form onSubmit={this.onSubmit}>
        <div className="fullform-section DiscussionListForm">
          <h2>{ i18next.t('Discussion List')}</h2>
          <forms.RenderForm form={this.state.forms.discussion_list} ref="discussionListForm" />
          <h2>{ i18next.t('Tags')}</h2>
          <TagsInput
            value={this.state.tags}
            inputProps={{ 'placeholder': '' }}
            onChange={(v) => this.setState({ tags: v })}
          />
          <span className="helpText">{i18next.t('Press enter to add a tag')}</span>
        </div>
        <div className="fullform-footer">
          <button className="primary" disabled={this.state.show_spinner}>{ buttonText }</button>
          <button onClick={this.props.onCancel}>{ i18next.t('cancel') }</button>
        </div>
      </form>
    );
  }
}

DiscussionListFormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
  initial_data: PropTypes.object,
  user: PropTypes.object,
};

export default DiscussionListFormContainer;
