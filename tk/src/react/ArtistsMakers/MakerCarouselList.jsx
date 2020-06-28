import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import has from 'lodash/has';
import isNull from 'lodash/isNull';
import MakerCarousel from './MakerCarousel';

class MakerCarouselList extends PureComponent {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.props.editable) {
      this.props.fetchMakers(this.props.editable);
    }
  }
  
  handleClick() {
    this.props.manageCarousel(0, 'ADD_CAROUSEL');
  }
  
  render() {
    const data = has(this.props, 'makerCarousels') ? this.props.makerCarousels.data : [];
    const addBtn = this.props.editable ? (<button onClick={this.handleClick}>Add</button>) : null;
    const totalCarousels = [];
    for (let d = 0; d < data.length; d++) {
      totalCarousels.push(d + 1);
    }
    return (
      <div className="row" id="carousel-list">
        {addBtn}
        {data.map(carousel =>
          (<MakerCarousel
            {...carousel}
            {...this.props}
            isModified={!isNull(this.props.modifiedId) && this.props.modifiedId === carousel.id}
            key={carousel.id}
            totalCarousels={totalCarousels}
          />)
        )}
      </div>
    );
  }
};


MakerCarouselList.defaultProps = {
  editable: false,
  makerCarousels: [{ id: 1 }]
};

MakerCarouselList.propTypes = {
  editable: PropTypes.bool,
  manageCarousel: PropTypes.func.isRequired,
  makerCarousels: PropTypes.shape({
    data: PropTypes.array,
    editorResponse: PropTypes.object,
    serverData: PropTypes.array
  })
}

export default MakerCarouselList;
