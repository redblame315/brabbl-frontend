import React from 'react';
import PropTypes from 'prop-types';
import forms from '../../common/newforms/newforms';
import AvatarEditor from 'react-avatar-editor';
import Dropzone, { useDropzone } from 'react-dropzone'
import TagsInput from 'react-tagsinput';
import API from '../../../api';
import { DiscussionOptionsForm, DiscussionForm, SurveyOptionsForm, 
         DiscussionDateTimeForm, DiscussionExternalUrlForm,
         DiscussionSettingsForm, DiscussionPrivateOptionForm,
         BarometerBehaviorForm, ImageCopyrightFormForm } from '../discussion';
import { CRemovableList, CButton, CCircularProgress, CCollapsable } from '../../common/atoms';
import { updateFormErrors } from './utils';
import { resizeBase64 } from '../../../utils';
import { ONLY_ARGUMENTS, ONLY_BAROMETER, ARGUMENTS_AND_BAROMETER,
         BAROMETER_BEHAVIOR_ALWAYS_SHOW, BAROMETER_BEHAVIOR_ONLY_FOR_VOTED_USER, 
         BAROMETER_BEHAVIOR_ONLY_FOR_VOTED_USER_OR_ADMIN } from '../../../constants';
import i18next from 'i18next';
import { connect } from 'react-redux';
import config from '../../../config/index';
import moment from 'moment';
import { getDiscussionParticipantUsers } from '../../discussion/utils';
import DiscussionParticipantFormContainer from './discussion_participant'

class DiscussionFormContainer extends React.Component {

  constructor(props) {
    super(props);
    let { initial_data, customer } = this.props,
      discussionType,
      barometerType = 'empty',
      initialTab = 'survey',
      is_private = false,
      has_initial_private_users = false,
      user_can_add_replies = true,
      barometer_behavior = BAROMETER_BEHAVIOR_ONLY_FOR_VOTED_USER_OR_ADMIN,
      copyright_info = '',
      tags = window.brabbl.defaultTags ? window.brabbl.defaultTags : [];
    if (customer.barometerOptions.length > 0) {
      barometerType = customer.barometerOptions[0].id;
    }

    if (initial_data) {
      let { has_barometer, has_arguments, discussion_wording } = initial_data;
      if (!this.props.initial_data.multiple_statements_allowed) {
        initialTab = 'discussion';
      }
      if (has_barometer && !has_arguments) {
        discussionType = ONLY_BAROMETER;
      } else if (has_arguments && !has_barometer) {
        discussionType = ONLY_ARGUMENTS;
      } else {
        discussionType = ARGUMENTS_AND_BAROMETER;
      }
      barometerType = discussion_wording || customer.default_wording;
      tags = initial_data.tags;
      if (initial_data.is_private) {
        is_private = initial_data.is_private
        if (initial_data.discussion_users && initial_data.discussion_users.length > 0) {
          has_initial_private_users = true
        }
      }
      if (!initial_data.user_can_add_replies) {
        user_can_add_replies = false
      }
      if(initial_data.barometer_behavior) {
        barometer_behavior = initial_data.barometer_behavior
      }
      if(initial_data.copyright_info) {
        copyright_info = initial_data.copyright_info
      }
    } else {
      discussionType = ARGUMENTS_AND_BAROMETER;
      if (customer.default_wording) {
        barometerType = customer.default_wording;
      }
    }

    let formData = { onChange: this.handleChange.bind(this) };

    if (initial_data) {
      Object.assign(formData, { data: initial_data });
    } else {
      if (initialTab === 'survey') {
        Object.assign(formData, { data: {multiple_statements_allowed: true }});
      }
    }
    

    let optionsFormData = {
      discussionType: discussionType,
      barometerType: barometerType,
    };
    let privateOptionFormData = { onChange: this.handleChange.bind(this),
                                  data: {
                                    is_private: is_private
                                  }}
    let surveyFormData = { onChange: this.handleChange.bind(this),
      data: {
        user_can_add_replies: user_can_add_replies
      }}
    let barometerBehaviorOptionFormData = { onChange: this.handleChange.bind(this),
      data: {
        barometer_behavior: barometer_behavior
      }}
    let imageCopyrightFormFormData = { onChange: this.handleChange.bind(this), 
      data: {
        copyright_info: copyright_info
      }}
    let disk_form = DiscussionForm(customer);
    let disk_date_form = DiscussionDateTimeForm(customer);
    let disk_url_form = DiscussionExternalUrlForm(customer);
    let serv_opt_form = SurveyOptionsForm();
    let disk_opt_form = DiscussionOptionsForm();
    let disk_setting_from = DiscussionSettingsForm();
    let disk_private_opt_form = DiscussionPrivateOptionForm();
    let barometer_behavior_form = BarometerBehaviorForm();
    let discussion_image_copyright_form = ImageCopyrightFormForm();

    this.state = {
      forms: {
        discussion: new disk_form(formData),
        discussionDateForm: new disk_date_form(formData),
        discussionUrlForm: new disk_url_form(formData),
        surveyOptions: new serv_opt_form(surveyFormData),
        settingOptions: new disk_setting_from({data: optionsFormData}),
        discussionOptions: new disk_opt_form({
          data: optionsFormData,
          barometerOptions: this.props.customer.barometerOptions,
        }),
        discussionPrivateOptions: new disk_private_opt_form(privateOptionFormData),
        barometerBehaviorOptions: new barometer_behavior_form(barometerBehaviorOptionFormData),
        imageCopyrightFormForm: new discussion_image_copyright_form(imageCopyrightFormFormData)
      },
      tags: tags,
      showOptions: initialTab,
      is_private: is_private,
      show_spinner: false,
      progress: 0,
      pdf_show_spinner: false,
      pdf_progress: 0,
      has_initial_private_users,
      image: null,
      pdfs: initial_data && initial_data.pdfs || []
     };
  }

  onSubmit = (e) => {
    e.preventDefault();
    let action = 'create';
    let data = {
      tags: this.state.tags,
    };
    if(this.props.app.articleId && this.props.app.view == 'detail') {
      data.external_id = this.props.app.articleId;
      data.url = window.location.href
    } else {
      data.external_id = null
    }
    if (this.props.initial_data) {
      data = { ...this.props.initial_data };
      action = 'edit';
    }
    this.submitForm(data, action);
  }

  handleChange = () => {
    let show_survey = ['on', true].indexOf(this.state.forms.discussion.data.multiple_statements_allowed) !== -1;
    if (show_survey) {
      this.setState({ 'showOptions': 'survey' });
    } else {
      this.setState({ 'showOptions': 'discussion' });
    }
  
    let is_private = ['on', true].indexOf(this.state.forms.discussionPrivateOptions.data.is_private) !== -1;
    this.setState({is_private: is_private && true})

    this.forceUpdate();
  }

  setAvatarEditorRef = (avatarEditor) => this.avatarEditor = avatarEditor

  handleDrop = dropped => {
    this.setState({ image: dropped[0] })
  }

  handleClick = (e) => {
    const attached = e.target.files
    this.setState({ image: attached[0] })
  }

  handleClickPDF = (e) => {
    const attached = e.target.files
    if (!attached || attached.length == 0) return;
    let pdfs = this.state.pdfs || []
    let alreadyAdded= pdfs.filter(item => item.name == attached[0].name)
    if(alreadyAdded && alreadyAdded.length > 0) {
      return;
    }
    if(this.isEdit()) {
      this.setState({ 'pdf_show_spinner': true, pdf_progress: 0 });
      API.create_discussion_pdf(this.props.initial_data.external_id, attached[0])
      .then(result => {
        pdfs.push(result.data)
        this.setState({pdfs: pdfs})
        this.setState({ 'pdf_show_spinner': false, pdf_progress: 0 });
      })
      .catch(resp => {
        this.setState({ 'pdf_show_spinner': false, pdf_progress: 0 });
      })
    } else {
      pdfs.push(attached[0])
      this.setState({pdfs: pdfs})
    }
  }

  handleDropPDF = dropped => {
    if (!dropped || dropped.length == 0) return;
    let pdfs = this.state.pdfs || []
    let alreadyAdded= pdfs.filter(item => item.name == dropped[0].name)
    if(alreadyAdded && alreadyAdded.length > 0) {
      return;
    }
    if(this.isEdit()) {
      API.create_discussion_pdf(this.props.initial_data.external_id, dropped[0])
      .then(result => {
        pdfs.push(result.data)
        this.setState({pdfs: pdfs})
      })
    } else {
      pdfs.push(dropped[0])
      this.setState({pdfs: pdfs})
    }
  }

  isEdit = () => {
    return this.props.initial_data && true;
  }

  handleRemovePDF = (removingPDF) => {
    if(this.isEdit()) {
      if(removingPDF && removingPDF.id) {
        API.delete_discussion_pdf(removingPDF.id)
        .then(removed => {
          let pdfs = this.state.pdfs || []
          let filteredPdfs= pdfs.filter(item => item.name != removingPDF.name)
          this.setState({pdfs: filteredPdfs})
        })
      }
    } else {
      let pdfs = this.state.pdfs || []
      let filteredPdfs= pdfs.filter(item => item.name != removingPDF.name)
      this.setState({pdfs: filteredPdfs})
    }

  }

  submitForm = (data, action) => {
    const { discussion_participants } = this.props
    let discussionForm = this.state.forms.discussion;
    let discussionUrlForm = this.state.forms.discussionUrlForm;
    let discussionDateForm = this.state.forms.discussionDateForm;
    let discussionOptionsForm = this.state.forms.discussionOptions;
    let surveyOptionsForm = this.state.forms.surveyOptions;
    let discussionSettingsForm = this.state.forms.settingOptions;
    let discussionPrivateOptionForm = this.state.forms.discussionPrivateOptions;
    let barometerBehaviorForm = this.state.forms.barometerBehaviorOptions;
    let imageCopyrightFormForm = this.state.forms.imageCopyrightFormForm;
    if (discussionForm.validate()
        && discussionDateForm.validate()
        && discussionUrlForm.validate()
        && discussionOptionsForm.validate()
        && discussionSettingsForm.validate()
        && surveyOptionsForm.validate()
        && discussionPrivateOptionForm.validate()
        && barometerBehaviorForm.validate()
        && imageCopyrightFormForm.validate()) {
      this.setState({ 'show_spinner': true, progress: 0 });
      // flatten & merge data
      Object.assign(data, discussionOptionsForm.cleanedData, discussionDateForm.cleanedData,
          discussionUrlForm.cleanedData,
          surveyOptionsForm.cleanedData, discussionForm.cleanedData
      );
      // convert some values to the format expected by the API
      let discussionType = discussionSettingsForm.cleanedData.discussionType;
      data.has_barometer = discussionType.has_barometer;
      data.has_arguments = discussionType.has_arguments;
      data.barometer_behavior = barometerBehaviorForm.cleanedData.barometer_behavior;
      delete data.discussionType;
      data.wording = discussionOptionsForm.cleanedData.barometerType;
      delete data.barometerType;
      data.user_can_add_replies = surveyOptionsForm.cleanedData.user_can_add_replies;
      data.tags = this.state.tags;
      data.is_private = discussionPrivateOptionForm.cleanedData.is_private;
      data.copyright_info = imageCopyrightFormForm.cleanedData.copyright_info;
      if(data.is_private) {
        data.users = discussion_participants
      }
      if (data.start_time) {
        data.start_time = moment(data.start_time).toISOString();
      }
      if (data.end_time) {
        data.end_time = moment(data.end_time).toISOString();
      }
      let base64Img = null;
      if(this.avatarEditor && this.state.image) {
        base64Img = this.avatarEditor.getImage("image/jpeg").toDataURL("image/jpeg");
      }

      if (base64Img) {
        data.image = base64Img;
      } else {
        delete data.image
      }
      resizeBase64(data.image, 1024, 706)
      .then(resizedImage => {
        if (resizedImage) {
          data.image = resizedImage
        }
        // send data
        let createOrUpdate;
        if (action === 'create') {
          if (this.state.pdfs && this.state.pdfs.length > 0) {
            data.pdfs = this.state.pdfs;
          }
          createOrUpdate = API.create_discussion(data,
            {
              onUploadProgress: progressEvent => {
                this.setState({progress: (progressEvent.loaded * 100) / progressEvent.total})
              }
            });
        } else {
          createOrUpdate = API.update_discussion(data.external_id, data,
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
          updateFormErrors(discussionForm, resp);
          updateFormErrors(discussionOptionsForm, resp);
          updateFormErrors(surveyOptionsForm, resp);
          this.setState({ 'show_spinner': false, progress: 0 });
          this.forceUpdate();
        });
      })
      .catch(err => {})
      
    } else {
      this.forceUpdate();
    }
  }

  renderSettingOptionsForm = () => {
    return <div>
      {
        this.state.showOptions !== 'discussion' &&
        <div>
          <forms.RenderForm key={2} form={this.state.forms.surveyOptions} ref="surveyOptionsForm" />
        </div>
      }
      <forms.RenderForm key={1} form={this.state.forms.settingOptions} ref="settingOptionsForm" />
    </div>
  }
  renderBarometerBehaviorOptionsForm = () => {
    return <forms.RenderForm key={1+'barometer-behavior'} form={this.state.forms.barometerBehaviorOptions} ref="barometerBehaviorForm" />
  }
  renderImageCopyrightFormForm = () => {
    return <forms.RenderForm key={'image-copyright'} form={this.state.forms.imageCopyrightFormForm} ref="imageCopyrightFormForm" />
  }

  renderPDFSection = () => {
    return <div className="fullform-section pdf-section">
        <p>{i18next.t('key_discussion-modal_add-pdf-file_title')}:</p>
        <CRemovableList 
            data={this.state.pdfs}
            removeItemTooltipText={i18next.t('key_discussion-modal_delete-pdf-hint')}
            removeItemConfirmText={i18next.t('key_discussion-modal_delete-pdf-confirm')}
            onRemoveItem={(item) => {this.handleRemovePDF(item)}}
            renderCustomText={(item) => {
              let url = config.MediaBaseUrl + item.url
              return <a className="brabbl-link" href={url} target="_blank">{item.name}</a>
            }}
            />
        <CButton 
          isFilePicker
          onFileChange={this.handleClickPDF}
          fileAccept=".pdf"
          type="secondary"
          disabled={this.state.pdf_show_spinner}
          containerStyle={{height: '40px'}}>
            {this.state.pdf_show_spinner ? <CCircularProgress value={this.state.pdf_progress}/>
                                          : i18next.t('ADD PDF')}
          </CButton>
        <div className="help-text">
          { i18next.t(
            'key_discussion-modal_add-pdf-file_help'
          )}
        </div>
    </div>
  }

  renderAvatarSection = () => {
    let image = this.props.initial_data ? this.props.initial_data.image.original : '';
    return <div className="fullform-section avatar-section">
          <label>{ i18next.t('Image')}:</label>
          <Dropzone
            onDrop={this.handleDrop}
            noClick
            noKeyboard
            style={{ width: '290px', height: '200px' }}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <AvatarEditor
                  className="file-section"
                  image={this.state.image || image}
                  ref={this.setAvatarEditorRef}
                  width={290}
                  height={200}
                  border={20}
                  color={[255, 255, 255, 0.6]}
                  scale={1}
                />
                <input {...getInputProps()} />
              </div>
            )}
          </Dropzone>
          <CButton 
            isFilePicker
            onFileChange={this.handleClick}
            fileAccept="image/png, image/jpeg"
            type="secondary"
            containerStyle={{height: '40px'}}>{i18next.t('Add Photo')}</CButton>
          <div className="help-text">
            { i18next.t(
              'Please drag a picture to the image area to change discussion picture'
            )}
          </div>
        </div>
  }

  renderAdvancedOptions = () => {
    return <div>
        <div className="fullform-section">         
          <forms.RenderForm key={1} form={this.state.forms.discussionOptions} ref="discussionOptionsForm" />
          <forms.RenderForm key={3} form={this.state.forms.discussionDateForm} ref="discussionDateForm" />
          <p className="item-label">{ i18next.t('Tags')}:</p>
          <TagsInput
            value={this.state.tags}
            inputProps={{ 'placeholder': '' }}
            onChange={(v) => this.setState({ tags: v })}
          />
          <span className="helpText">{i18next.t('Press enter to add a tag')}</span>
          {this.renderSettingOptionsForm()}
          {this.renderBarometerBehaviorOptionsForm()}
          <forms.RenderForm key={4} form={this.state.forms.discussionUrlForm} ref="discussionUrlForm" />
        </div>
    </div>
  }

  onClickManageParticipant = () => {
  }
  renderManageParticipants = () => {
    const { is_private } = this.state;
    const { discussion_participants, customer } = this.props
    if(!customer) return null
    const participants = getDiscussionParticipantUsers(customer.users, discussion_participants)
    const names = participants ? participants.map(participant => {
      return participant.display_name
    }).join(", ") : ""

    if (!is_private) {
      return <div className="fullform-section">
        <p>{ i18next.t('key_discussion-modal_public-discussion-text')}</p>
      </div>
    }
    if (discussion_participants && discussion_participants.length > 0) {
      return <div className="fullform-section" style={{marginTop: '16px'}}>
        <span>{ i18next.t('key_discussion-modal_private-discussion-text')}</span>
        <div style={{marginBottom: '16px'}}/>
        <div className="participant-names">{names}</div>
        <div style={{marginBottom: '16px'}}/>
      </div>
    }
    return <div className="fullform-section">
      <span>{ i18next.t('key_discussion-modal_private-discussion-no-participants')}</span>
      <div style={{marginBottom: '16px'}}/>
    </div>
  }
  render() {
    let title = this.state.showOptions === 'discussion' ? 'Discussion' : 'Survey';
    let buttonText = this.props.initial_data ? `Edit ${title}` : `Add new ${title}`;
    buttonText = this.state.show_spinner ? <CCircularProgress value={this.state.progress}/> : i18next.t(buttonText);
    return (
      <form onSubmit={this.onSubmit}>
        <div className="fullform-section createDiscussionForm">
          <p>{ i18next.t('key_discussion-modal_discussion-type-section_title')}</p>
          {this.state.forms.discussion.render()}
        </div>
        {this.renderAvatarSection()}
        {this.renderImageCopyrightFormForm()}
        {this.renderPDFSection()}
        {
          this.props.customer.are_private_discussions_allowed &&
          <div className="participant-section">
            <p>{ i18next.t('key_discussion-modal_participants-section-title')}</p>
            {this.state.forms.discussionPrivateOptions.render()}
            {this.renderManageParticipants()}
            {
              this.state.is_private &&
              <div className="manage-participant" style={{marginBottom: '24px'}}>
                <CCollapsable title={i18next.t('Manage Participants')} opened={!this.state.has_initial_private_users}>
                  <DiscussionParticipantFormContainer
                    customer={this.props.customer}
                  />
                </CCollapsable>
              </div>
            }
          </div>
        }
       
        <CCollapsable title={i18next.t('Advanced Options')}>
          {this.renderAdvancedOptions()}
        </CCollapsable>

        <div className="fullform-footer">
          <button className="primary" disabled={this.state.show_spinner}>{ buttonText }</button>
          <button onClick={this.props.onCancel}>{ i18next.t('cancel') }</button>
        </div>
      </form>
    );
  }
}

DiscussionFormContainer.propTypes = {
  initial_data: PropTypes.object,
  customer: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  app: state.app, discussion_participants: state.discussion_participants,
});

export default connect(mapStateToProps)(DiscussionFormContainer);
