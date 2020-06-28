import { Component } from 'react';
import { has } from 'lodash/fp';
import PropTypes from 'prop-types';

class RadioInput extends Component {
  constructor(props) {
    super(props);
    const val = has('propValue')(props) ? props.propValue : false;
    this.state = { value: val };
    this.getValue = this.getValue.bind(this);
  }
  getValue() {
    return this.state.value;
  }
  render() {
    const options = [{ value: true, label: 'True' }, { value: false, label: 'False' }];
    const markup = options.map((option, i) => {
      const keyNumber = Math.random() * 100;
      const selected = this.state.value === option.value;
      return (
        <label
          key={`RadioComp${keyNumber}`}
          className="radio-inline"
          htmlFor={this.props.propName + i}
        >
          <input
            type="radio"
            name={this.props.propName}
            id={this.props.propName + i}
            value={option.value}
            checked={selected}
            onChange={(e) => this.setState({ value: JSON.parse(e.target.value) })}
          />
          {option.label}
        </label>
      );
    });
    return (
      <div className="radio-input">
        <label className="control-label" htmlFor={this.props.propName}>{this.props.label || this.props.propName}</label>
        {markup}
      </div>
    );
  }
}

RadioInput.propTypes = {
  propName: PropTypes.string,
  propValue: PropTypes.bool
};

export default RadioInput;
