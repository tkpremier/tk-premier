// this component takes categories linked by key value and create a list of filtered categories in a drop down menu.
// this will require a key value pair of rthe name and filter params.
// example: Artist Name : all valid artist names from data set.

import React, { Component } from 'react';
import { connect } from 'react-redux';


const FilterCategories = (props) => (
    <a
      // href="#"
      className="toggle category"
      // data-dimension="Year"
    >
      {props.categoryName}
    </a>
  );

const mapStateToProps = state => ({
  filterData: state.filterData
});

export default connect(mapStateToProps, null)(FilterCategories);
