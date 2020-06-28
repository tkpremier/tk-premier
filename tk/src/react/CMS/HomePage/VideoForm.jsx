import React from 'react';
import CMSControls from '../CMSControls.container';
import PhillipsCarousel from '../../PhillipsCarousel/PhillipsCarousel';
import EditOverlay from '../EditOverlay';

const VideoForm = ({ data }) => (
  <section id="video-form">
    <span>
      <h2>Video Carousel (CMS Only)</h2>
        &nbsp;&nbsp;&ndash;&nbsp;&nbsp;
      <p>Add, edit, and order videos to display on homepage.</p>
    </span>
    <CMSControls
      editable
      elementProps={data}
      addType="video"
      showAdd
    >
      <PhillipsCarousel
        classNames="cms-video-form"
      >
        {data.map(video => (
          <EditOverlay
            className="edit-container"
            key={video.id}
            elementProps={video}
            elementType="video"
          >
            <div className="cms-video">
              <img
                alt={video.videoUrl}
                src={video.thumbnail}
              />
              <div>
                <h2>{video.thumbnailCaption}</h2>
              </div>
            </div>
          </EditOverlay>
        ))}
      </PhillipsCarousel>
    </CMSControls>
  </section>
);

export default VideoForm;
