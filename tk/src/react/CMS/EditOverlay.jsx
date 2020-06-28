import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectElement } from './actions';

const mapStateToProps = (state, { elementProps, elementType, hideDelete }) => ({ elementProps, elementType, hideDelete });

const mapDispatchToProps = {
  selectElement
};

class EditOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false };
  }

  handleOverlaySelect = (e) => {
    const { value } = e.target;
    const {
      elementProps,
      elementType
    } = this.props;
    this.props.selectElement({
      elementProps,
      elementType,
      type: value
    });
  }

  handleMouse = (e) => {
    const { type } = e;
    const isHovered = type === 'mouseenter';
    this.setState({ isHovered });
  };

  render() {
    const { elementProps, elementType, children, className } = this.props;
    const hiddenClass = this.state.isHovered ? '' : 'hidden';
    return (
      <div
        className={className}
        onMouseEnter={this.handleMouse}
        onMouseLeave={this.handleMouse}
      >
        <div className={`edit-overlay ${hiddenClass}`}>
          <button
            className="edit-overlay__button"
            onClick={this.handleOverlaySelect}
            type="button"
            value="edit"
          >
            Edit
          </button>
          <button
            className="edit-overlay__button"
            onClick={this.handleOverlaySelect}
            type="button"
            value="delete"
          >
            Delete
          </button>
        </div>
        {children}
      </div>
    );
  }
}

EditOverlay.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  elementProps: PropTypes.object,
  elementType: PropTypes.string,
  hideDelete: PropTypes.bool,
  select: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(EditOverlay);
