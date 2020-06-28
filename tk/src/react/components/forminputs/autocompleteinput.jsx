import { Component } from 'react';
import { find } from 'lodash/fp';
import { head } from 'lodash';
import PropTypes from 'prop-types';

class AutoCompleteInput extends Component {
  constructor(props) {
    super(props);
    const initialModel = find(props.comparator(props.initialValue))(props.list);
    const val = initialModel ? initialModel[props.descProp] : '';
    this.state = {
      inputValue: val,
      list: props.list,
      selectedValue: props.initialValue
    };
    this.getValue = this.getValue.bind(this);
  }
  getValue() {
    return this.state.selectedValue;
  }
  render() {
    const filterList = (value) => {
      const newList = value.length > 3 ?
        this.props.list
          .filter(item => item[this.props.descProp].toLowerCase().includes(value.toLowerCase()))
          .sort() :
        this.props.list;
      this.setState({ list: newList });
    };
    const onKeyUp = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        const item = head(this.state.list);
        this.setState({
          inputValue: item[this.props.descProp],
          selectedValue: item[this.props.valueProp]
        });
      } else {
        filterList(e.target.value);
      }
    };
    const list = this.state.list.slice(0, 7).map((item) => {
      const setValue = () => {
        this.setState({
          selectedValue: item[this.props.valueProp],
          inputValue: item[this.props.descProp]
        });
      };
      return (
        <li
          role="button"
          onClick={setValue}
        >{item[this.props.descProp]}</li>
      );
    });
    return (
      <div className="autocomplete-input">
        <label>{this.props.label}: {this.state.inputValue}</label>
        <div className="autocomplete-wrapper">
          <input
            type="text"
            defaultValue={this.state.inputValue}
            onKeyUp={onKeyUp}
          />
          <input defaultValue={this.state.selectedValue} type="text" className="hidden" />
          <ul className="autocomplete-list">
            {list}
          </ul>
        </div>
      </div>
    );
  }
}

AutoCompleteInput.propTypes = {
  list: PropTypes.array.isRequired,
  descProp: PropTypes.string.isRequired,
  valueProp: PropTypes.string.isRequired,
  comparator: PropTypes.func.isRequired,
  label: PropTypes.string,
  initialValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

export default AutoCompleteInput;
