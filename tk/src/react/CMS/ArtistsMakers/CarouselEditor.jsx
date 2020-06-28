import React, { Component } from 'react';
import { isNull } from 'lodash/fp';
import EditorResponse from '../../ArtistsMakers/components/EditorResponse';

const CarouselEditor = (props) => {
  const deleteBtn = props.id !== 0 ? (
    <button
      className="delete-carousel"
      onClick={() => { props.deleteCarousel(props.id); }}
    >Delete</button>) :
    null;
  const editorResponse = (!isNull(props.editorResponse.status) &&
    props.editorResponse.carouselId === props.id) ?
    (<EditorResponse {...props.editorResponse} />) :
    null;
  return (
    <div className="row carousel-editor">
      <form onSubmit={props.onSubmit}>
        <span className="label">Carousel Name: </span>
        <input
          defaultValue={props.name}
          name="name"
          placeholder="Enter Carousel Name"
          type="text"
        />
        <button onClick={props.handleAddMaker} className="add-maker-button">Add Maker</button>
        <span className="label">Active: </span>
        <label htmlFor="carousel-active-true">True</label>
        <input
          type="radio"
          value
          name="active"
          defaultChecked={props.active === true}
          id="carousel-active-true"
        />
        <label htmlFor="carousel-active-false">False</label>
        <input
          type="radio"
          value={false}
          name="active"
          id="carousel-active-false"
          defaultChecked={props.active === false}
        />
        <label className="label" htmlFor="carousel-display-order">Display Order: </label>
        <DisplayOrder
          totalCarousels={props.totalCarousels}
          displayOrder={props.displayOrder}
        />
        <input
          type="submit"
          value="Done"
        />
      </form>
      {deleteBtn}
      {editorResponse}
    </div>
  );
};

class DisplayOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.displayOrder,
      list: props.totalCarousels
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.displayOrder !== nextProps.displayOrder ||
      this.props.totalCarousels !== nextProps.totalCarousels) {
      this.setState({
        value: nextProps.displayOrder,
        list: nextProps.totalCarousels
      });
    }
  }

  render() {
    const handleChange = (e) => {
      this.setState({
        'value': e.target.value
      });
    };
    const options = this.state.list.map(i => (
      <option value={i} key={i}>{i}</option>
    ));
    return (
      <select
        id="carousel-display-order"
        value={this.state.value}
        name="displayOrder"
        onChange={handleChange}
      >
        {options}
      </select>
    );
  }
}

export default CarouselEditor;
