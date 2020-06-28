import { Component } from 'react';
import PropTypes from 'prop-types';
import { isUndefined } from 'lodash/fp';

class SelectInput extends Component {
  constructor(props) {
    super(props);
    const list = props.list
      ? props.list
      : [{ 'value': '', 'desc': '' }];
    const value = props.defaultValue
      ? props.defaultValue
      : '';
    this.state = {
      list,
      value
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getValue() {
    return this.state.value;
  }

  handleChange(e) {
    const { changeCallback } = this.props;
    if (!isUndefined(changeCallback)) {
      changeCallback(e.target.value);
    }
    this.setState({
      'value': e.target.value
    });
  }

  render() {
    const { name } = this.props;
    const { list, value } = this.state;
    const markup = list.map((opt) => (
      <option
        key={opt.value}
        value={opt.value}
      >
        {opt.desc}
      </option>
    ));
    return (
      <select name={name} value={value} onChange={this.handleChange}>
        <option value="" key="0">Please choose</option>
        {markup}
      </select>
    );
  }
}

export default SelectInput;
