import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../utils/formatdate';

const DeptPress = (props) => {
  const PressRelease = (data) => {
    return (
      <section className="content-block-calendar col-xs-12">
        <div className="row">
          <div className="content-block-date col-xs-1 col-sm-2">
            <h1>{formatDate(data.eventDate).split(' ')[0]}</h1>
          </div>
          <div className="content-block-description col-xs-9 col-sm-10">
            <p>
              <span className="release">Press Release: </span>
              <span className="date">{formatDate(data.eventDate)}</span>
            </p>
            <div className="truncate" dangerouslySetInnerHTML={{ __html: data.description }}></div>
            <a href={data.articlePath}>Read more</a>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="department-grid row">
      <h2>{props.title}</h2>
      {props.data.map(data => PressRelease(data))}
      <a className="cta-button" href={props.ctaUrl}>{props.ctaText}</a>
    </div>
  );
};

DeptPress.defaultProps = {
  ctaText: '',
  ctaUrl: '',
  data: [],
  title: 'Press'
};

DeptPress.propTypes = {
  ctaText: PropTypes.string,
  ctaUrl: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.object
  ),
  title: PropTypes.string
};

export default DeptPress;
