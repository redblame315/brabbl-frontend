import React from 'react';
import PropTypes from 'prop-types';
import { CMarkupParser } from '../common/atoms';
import config from '../../config/index';
import AvatarContainer from '../avatar-container';
import Media from '../media';
import { MEDIA_TYPE_IMAGE, MEDIA_TYPE_YOUTUBE, MODAL_MEDIA } from '../../constants';
import { showModal } from '../../actions/app';



class DiscussionMeta extends React.Component {
  renderPdfs = () => {
    let { discussion } = this.props;
    let pdfs = discussion.pdfs;
    if (!pdfs) return null;
    return <div style={{display: 'flex', flexDirection: 'column', marginTop: '16px'}}>
      {
        pdfs.map(pdf => {
          let url = config.MediaBaseUrl + pdf.url
          return <a class="brabbl-link" href={url} target="_blank">{pdf.name}</a>
        })
      }
    </div>
  }
  onOpenImageModal = (e, media_data) => {
    let { dispatch } = this.props;
    if (e) {
      e.preventDefault()
    }
    dispatch(showModal(MODAL_MEDIA, {
      ...media_data,
      thumbnail: media_data.url
    }))
  }
  render () {
    const { discussion, isStatement, optionsList } = this.props
    if (!discussion) return null 

    let media_data = null;

    if ('video' in discussion && discussion.video) {
      media_data = {
        media_type: MEDIA_TYPE_YOUTUBE,
        url: discussion.video,
      };
    } else if ('image' in discussion && discussion.image) {
      media_data = {
        media_type: MEDIA_TYPE_IMAGE,
        url: discussion.image.original,

      };
    }


    return <div className="discussion-header">
      {
        media_data && media_data.url &&
        <a className="discussion-img-container"
          onClick={(e) => {
            this.onOpenImageModal(e, { ...media_data, copyright_info: discussion.copyright_info})
          }}
        >
          <Media data={media_data} />
        </a>
      }
      <div className="discussion-info">
        <AvatarContainer user={discussion.author} size={26} date={discussion.created_at} dateFormat="DD.MM.YYYY HH:mm"/>
        <h2 className="discussion-title">{discussion.statement}</h2>
        <div className="discussion-description">
          <CMarkupParser htmlString={discussion.description} />
        </div>
        {this.renderPdfs()}
        {optionsList}       
      </div>
  </div>
  }
}

DiscussionMeta.propTypes = {
  discussion: PropTypes.object.isRequired,
};

export default DiscussionMeta;