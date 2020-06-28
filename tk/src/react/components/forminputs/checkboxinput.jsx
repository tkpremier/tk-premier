import { Component } from 'react';

class CheckboxInput extends Component {
  getValue() {
    return this.state.value;
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  render() {
    return (
      <input type="checkbox" name="hasSticky" id="hasSticky" onChange={this.handleChange.bind(this)} />
    );
  }
}

export default CheckboxInput;
