import React from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone'
import API from '../../../api';
import forms from '../../common/newforms/newforms';
import { StatementForm, VideoForm } from '../statement';
import { ImageCopyrightFormForm } from '../discussion';
import { updateFormErrors } from './utils';
import { cutUrlHash, resizeBase64 } from '../../../utils';
import i18next from 'i18next';
import { CRemovableList, CButton, CCircularProgress } from '../../common/atoms';
import config from '../../../config/index';
class StatementFormContainer extends React.Component {

  constructor(props) {
    super(props);
    let { initial_data } = this.props;
    let statement_form = StatementForm();
    let video_form = VideoForm();
    let image_copyright_form = ImageCopyrightFormForm();
    let media_type = 'image';
    let form_data = { onChange: this.forceUpdate.bind(this) };

    if (initial_data.statement) {
      let image = ('original' in initial_data.image) ? initial_data.image.original : '';
      if (image) {
        media_type = 'image';
      } else if (initial_data.video) {
        media_type = 'video';
      }
      form_data.data = {
        statement: initial_data.statement,
        description: initial_data.description,
        image: image,
        video: initial_data.video ? 'https://youtube.com/v/' + initial_data.video : '',
        copyright_info: initial_data.copyright_info || ''
      };
    }

    this.state = {
      form: new statement_form(form_data),
      video_form: new video_form(form_data),
      image_copyright_form: new image_copyright_form(form_data),
      media_type: media_type,
      show_spinner: false,
      image: null,
      pdfs: initial_data && initial_data.pdfs || [],
      progress: 0,
      pdf_show_spinner: false,
      pdf_progress: 0
    };
  }
  onSubmit = (e) => {
    let cleaned_data;
    let { initial_data, app } = this.props;
    let articleId = window.brabbl.articleId;
    if(this.props.app) {
      articleId = this.props.app.articleId;
    } 
    let form = this.state.form;
    let video_form = this.state.video_form;
    let image_copyright_form = this.state.image_copyright_form;
    let isValid = form.validate()
                    && video_form.validate()
                    && image_copyright_form.validate();
    e.preventDefault();
    if (isValid) {
      this.setState({ 'show_spinner': true, progress: 0 });
      cleaned_data = form.cleanedData;
      Object.assign(cleaned_data, video_form.cleanedData);
      Object.assign(cleaned_data, image_copyright_form.cleanedData);
      let post_data = {
        statement: cleaned_data.statement,
        description: cleaned_data.description,
        discussion_id: cutUrlHash(articleId),
        video: cleaned_data.video,
        copyright_info: cleaned_data.copyright_info
      };
      if (this.state.media_type === 'image') {
        let base64Img = null;
        if(this.avatarEditor && this.state.image) {
          base64Img = this.avatarEditor.getImage("image/jpeg").toDataURL("image/jpeg");
          if (base64Img) {
            post_data.image = base64Img
          }
        }
       
        delete post_data.video;
      } else {
        delete post_data.image;
      }
      resizeBase64(post_data.image, 1024, 706)
      .then(resizedImage => {
        if (resizedImage) {
          post_data.image = resizedImage
        }
        let createOrUpdate;
        if (initial_data.statementId) {
          createOrUpdate = API.update_statement(
            initial_data.statementId, post_data,
            {
              onUploadProgress: progressEvent => {
                this.setState({progress: (progressEvent.loaded * 100) / progressEvent.total})
              }
            });
        } else {
          if (this.state.pdfs && this.state.pdfs.length > 0) {
            post_data.pdfs = this.state.pdfs;
          }
          createOrUpdate = API.create_statement(post_data,
              {
                onUploadProgress: progressEvent => {
                  this.setState({progress: (progressEvent.loaded * 100) / progressEvent.total})
                }
              }
            );
        }
        createOrUpdate
        .then(resp => {
          this.props.handleSubmit(resp);
        })
        .catch(resp => {
          updateFormErrors(form, resp);
          updateFormErrors(video_form, resp);
          this.setState({ 'show_spinner': false, progress: 0 });
          this.forceUpdate();
        });
        this.forceUpdate();
      })
      .catch(ex => {
        
      })
    }

  }

  setAvatarEditorRef = (avatarEditor) => this.avatarEditor = avatarEditor

  handleDrop = dropped => {
    this.setState({ image: dropped[0] })
  }
  handleClick = (e) => {
    const attached = e.target.files
    this.setState({ image: attached[0] })
  }

  isEdit = () => {
    return this.props.initial_data && this.props.initial_data.statementId && true;
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
      API.create_statement_pdf(Number(this.props.initial_data.statementId), attached[0])
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
  handleRemovePDF = (removingPDF) => {
    if(this.isEdit()) {
      if(removingPDF && removingPDF.id) {
        API.delete_statement_pdf(removingPDF.id)
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

  renderPdfInput = () => {
    return (
      <div className="fullform-section pdf-section">
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
    )
  }
  
  renderPhotoInput = () => {
    let form;
    let { initial_data } = this.props;
    if (this.state.media_type === 'image') {
      let orignalImage = initial_data.image ? initial_data.image.original : null;
      form = (
        <div className="fullform-section avatar-section">
          <p>{i18next.t('key_statement-modal_add-image_title')}:</p>
          <Dropzone
            onDrop={this.handleDrop}
            noClick
            noKeyboard
            style={{ width: '200px', height: '290px' }}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <AvatarEditor
                  image={this.state.image || orignalImage}
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
              'key_statement-modal_add-image_help'
            )}
          </div>
        </div>);
    } else if (this.state.media_type === 'video') {
      form = <forms.RenderForm key={2} form={this.state.video_form} ref="VideoForm" />;
    }
    return form;
  }
  renderImageCopyrightFormForm = () => {
    return <forms.RenderForm key={'image-copyright'} form={this.state.image_copyright_form} ref="imageCopyrightFormForm" />
  }

  render() {
    let headerText;
    let { title, discussion: { statement } } = this.props;
    let { form } = this.state;
    headerText = (
      <div>
        <h1>{i18next.t('Add new idea')}</h1>
      </div>
    );
    let buttonText = this.props.initial_data.statement ? 'Edit' : 'Add new';
    buttonText = this.state.show_spinner ? <CCircularProgress value={this.state.progress}/>
                                          : i18next.t(buttonText);


    return (
      <div className="fullform">
        <div className="fullform-header">
          {headerText}
        </div>
        <div className="fullform-body">
          <label>
            {'DISCUSSION'}
          </label>
          <div className="section-title">
            {statement}
          </div>
          <form onSubmit={this.onSubmit}>
            {form.render()}
            <div className="fullform-section statementForm">
              {this.renderPhotoInput()}
              {this.renderImageCopyrightFormForm()}
              {this.renderPdfInput()}
            </div>
            <div className="fullform-footer">
              <button className="primary" onClick={this.onSubmit} disabled={this.state.show_spinner}>
                {buttonText}
              </button>
              <button onClick={this.props.handleCancel}>{ i18next.t('Cancel') }</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

StatementFormContainer.propTypes = {
  initial_data: PropTypes.object,
  title: PropTypes.string.isRequired,
  discussion: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default StatementFormContainer;
