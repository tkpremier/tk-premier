import PropTypes from 'prop-types';

const PhillipsEmployee = props => (
  <div id="itemid21">
    <div className="image">
      <img
        src={props.imageUrl}
        alt={`${props.firstName} ${props.lastName}`}
        title={`${props.firstName} ${props.lastName}`}
      />
    </div>
    <div className="description">
      <p><strong>{props.firstName} {props.lastName}</strong></p>
      <p>{props.title}</p>
      <p>{props.phone}</p>
    </div>
  </div>
);

PhillipsEmployee.defaultProps = {
  firstName: '',
  imageUrl: '',
  lastName: '',
  phone: '',
  title: ''
};

PhillipsEmployee.propTypes = {
  firstName: PropTypes.string,
  imageUrl: PropTypes.string,
  lastName: PropTypes.string,
  phone: PropTypes.string,
  title: PropTypes.string
};

export default PhillipsEmployee;
