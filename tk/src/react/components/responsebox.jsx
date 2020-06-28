import PropTypes from 'prop-types';

const ResponseBox = (props) => {
  const btnClass = props.status === 200 ? 'btn-success' : 'btn-error';
  return (
    <div
      className="alert row"
      style={{ justifyContent: 'center', alignItems: 'center' }}
      id="homepage-alert"
    >
      <div className="centered">
        <h2>{props.status === 200 ? 'success' : 'error'}</h2>
        <br />
        <p>{props.message}</p>
        <button type="button" className={`btn ${btnClass}`} onClick={props.onHide}>OK</button>
      </div>
    </div>
  );
};

ResponseBox.propTypes = {
  status: PropTypes.number,
  message: PropTypes.string,
  onHide: PropTypes.func
};

export default ResponseBox;
