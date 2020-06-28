import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterSort } from './actions';

class Sort extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { filter } = this.props.state.urlQueries;
    const { dispatch } = this.props;
    const optionChange = (event) => {
      const newSort = event.target.value;
      dispatch(filterSort(filter, newSort));
    };
    return (
      <select onChange={optionChange}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    );
  }
}

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps, null)(Sort);
