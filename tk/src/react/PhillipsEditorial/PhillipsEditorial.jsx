import PropTypes from 'prop-types';

const PhillipsEditorial = props => (
  <div id="itemid21">
    <div className="image">
      <a className="image-link">
        <img src={props.coverUrl} alt={props.title} title={props.title} />
      </a>
    </div>
    <div className="description">
      <p><strong>{props.title}</strong></p>
      <p>{props.summary}</p>
    </div>
  </div>
);

PhillipsEditorial.defaultProps = {
  coverUrl: '',
  summary: '',
  title: ''
};

PhillipsEditorial.propTypes = {
  coverUrl: PropTypes.string,
  summary: PropTypes.string,
  title: PropTypes.string
};

export default PhillipsEditorial;
