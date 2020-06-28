import PropTypes from 'prop-types';

const ElementSelecter = (props) => {
  return (
    <select defaultValue={props.currentType} onChange={props.onChange}>
      <option value="Text">Text</option>
      <option value="Image">Image</option>
      <option value="Button">Button</option>
    </select>
  );
};

ElementSelecter.propTypes = {
  currentType: PropTypes.string,
  onChange: PropTypes.func
};

export default ElementSelecter;
