import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import loadImageFromFile from '../../utils/loadImageFromFile';

const handleImg = (e) => {
  const event = e;
  if (event.type === 'error') {
    event.target.src = '/img/item_placeholder.png';
  }
  return event;
};

class ImageInput extends Component {
  constructor(props) {
    super(props);
    this.state = { imageSrc: props.propValue };
    this.input = createRef(null);
    this.onChange = this.onChange.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  getValue() {
    return this.input.current?.files?.length > 0
      ? this.input.current.files
      : this.props.propValue;
  }


  onChange(event) {
    const file = event.target.files[0];
    loadImageFromFile(file, e => this.setState({ imageSrc: e.target.result }));
  }

  render() {
    return (
      <div className="image-input">
        <div className="image-input-wrapper">
          {this.props.toolTip
            ? (
              <p className="tool-tip">
                <label>Note:</label>
                &nbsp;&nbsp;{this.props.toolTip}
              </p>
            )
            : null
          }
          <label htmlFor={this.props.propName}>{this.props.label || this.props.propName}:</label>
          <input
            className={this.props.propName}
            name={this.props.propName}
            onChange={this.onChange}
            ref={this.input}
            type="file"
          />
        </div>
        <img
          alt={`preview-img-${this.props.propName}`}
          className="image-preview"
          onError={handleImg}
          onLoad={handleImg}
          src={this.state.imageSrc}
          title={`preview-img-${this.props.propName}`}
        />
      </div>
    );
  }
}

ImageInput.defaultProps = {
  label: '',
  propName: '',
  propValue: '',
  toolTip: ''
};

ImageInput.propTypes = {
  label: PropTypes.string,
  propName: PropTypes.string,
  propValue: PropTypes.string,
  toolTip: PropTypes.string
};

export default ImageInput;
