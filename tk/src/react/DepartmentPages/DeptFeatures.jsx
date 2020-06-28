import React from 'react';
import PropTypes from 'prop-types';

const DeptFeatures = (props) => {
  const Features = (data) => {
    const imageStyle = {
      backgroundImage: `url('${encodeURI(data.coverUrl)}')`,
      backgroundSize: 'cover',
      height: '248px'
    };
    return (
      <section className="content-block-imagepanel col-xs-12 col-md-6">
        <a href={data.articleUrl}>
          <div className="content-block-image" style={imageStyle} />
          <div className="content-block-copy">
            <h3>{data.title}</h3>
            <p className="truncate">{data.summary}</p>
            <p className="underline">Read more</p>
          </div>
        </a>
      </section>
    );
  };

  return (
    <div className="department-grid container">
      <h2>{props.title}</h2>
      <div className="row">
        {props.data.map(data => Features(data))}
      </div>
      <a className="cta-button" href={props.ctaUrl}>{props.ctaText}</a>
    </div>
  );
};

DeptFeatures.defaultProps = {
  ctaText: '',
  ctaUrl: '',
  data: [],
  title: ''
};

DeptFeatures.propTypes = {
  ctaText: PropTypes.string,
  ctaUrl: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.object
  ),
  title: PropTypes.string
};

export default DeptFeatures;
