import PropTypes from 'prop-types';

const EditOverlay = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    const method = e.currentTarget.dataset.method;
    const type = props.element.props.type;
    props.onClick(props.element, type, method);
  };
  const btnMarkup = props.types.map((type, i) => {
    return (
      <a onClick={handleClick} key={i} data-method={type.method}>
        <div className={type.desc}></div>
        <h2>{type.desc}</h2>
      </a>
    );
  });
  return (
    <div className="edit-overlay">
      {btnMarkup}
    </div>
  );
};

EditOverlay.propTypes = {
  element: PropTypes.element,
  types: PropTypes.array,
  onClick: PropTypes.func
};

export default EditOverlay;
