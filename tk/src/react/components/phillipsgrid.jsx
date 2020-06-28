import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';

const Grid = ({ children, listClass, itemClass, header, numberOfItemsShown, showMore, isEnd }) => {
  const gridItems = children.slice(0, numberOfItemsShown).map((item) =>
    cloneElement(item, { className: `${item.props.className} ${itemClass}` })
  );
  return (
    <div className="phillips-grid col-xs-12">
      <h2>{header}</h2>
      <ul className={`${listClass} row`}>
        {gridItems}
      </ul>
      {!isEnd ? <div className="show-more" onClick={showMore}>Explore More</div> : null}
    </div>
  );
};
Grid.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  listClass: PropTypes.string,
  itemClass: PropTypes.string,
  header: PropTypes.string,
  numberOfItemsShown: PropTypes.number,
  showMore: PropTypes.func,
  isEnd: PropTypes.bool
};

class PhillipsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfItemsShown: this.props.itemsShown >= 4 ? this.props.itemsShown : 4,
      isEnd: false
    };
  }
  render() {
    const { children } = this.props;
    const showMore = () => {
      const { numberOfItemsShown } = this.state;
      const nextNumberOfItemsShown = numberOfItemsShown + 4;
      if (nextNumberOfItemsShown >= children.length) {
        this.setState({
          numberOfItemsShown: nextNumberOfItemsShown,
          isEnd: true
        });
      } else {
        this.setState({ numberOfItemsShown: nextNumberOfItemsShown });
      }
    };
    return (
      <Grid showMore={showMore} {...this.props} {...this.state}>
        {children}
      </Grid>
    );
  }
}

PhillipsGrid.propTypes = {
  editable: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element),
  itemsShown: PropTypes.number,
  listClass: PropTypes.string,
  header: PropTypes.string
};

export default PhillipsGrid;
