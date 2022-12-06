import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import { MEDIA_TYPE_IMAGE, MEDIA_TYPE_YOUTUBE } from '../constants';
import LazyLoad from 'react-lazy-load';

class Media extends React.Component {

  render() {
    let { url, media_type, copyright_info } = this.props.data;
    let media;
    if (media_type === MEDIA_TYPE_IMAGE) {
      media = (<img className="image-media" src={ url } />);
    } else if (media_type === MEDIA_TYPE_YOUTUBE) {
      media = (<div className="video-container"><YouTube videoId={ url } /></div>);
    }
    return (
        <div className="media">
          { media }
          {
            copyright_info &&
            <div className="copyright">{copyright_info}</div>
          }
          
        </div>
    );
  }
}

Media.propTypes = {
  data: PropTypes.object.isRequired,
};


export default Media;
