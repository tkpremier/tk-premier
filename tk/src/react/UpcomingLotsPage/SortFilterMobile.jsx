import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { isUndefined } from 'lodash/fp';
import SortFilter from './SortFilter';

class SortFilterMobile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      deviceHeight: 0,
      containerHeight: 71
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      deviceHeight: window.innerHeight,
      containerHeight: window.innerHeight
    });
  }

  handleClick() {
    const { opened } = this.state;
    let innerHeight = 71;
    if (typeof window !== 'undefined') {
      innerHeight = window.innerHeight;
    }
    this.setState({
      opened: !opened,
      deviceHeight: innerHeight,
      containerHeight: innerHeight
    })
  }

  render() {
    const wrapperStyles = this.state.opened ? {
      transform: `translateY(56px)`
    } : {
      transform: `translateY(${this.state.deviceHeight - 71}px)`
    }
    return (
      <div
        className={classNames('sortfilter__container sortfilter__container--mobile', { 'sortfilter__container--opened': this.state.opened })}
      >
        <button
          className={classNames("sortfilter__btn sortfilter__btn--close sortfilter__btn--mobile", { 'sortfilter__btn--close--opened' : this.state.opened})}
          onClick={this.handleClick}
          title="Click button to open filter menu"
          type="button"
        >
          &#x2715;
        </button>
        <SortFilter
          deviceHeight={this.state.deviceHeight}
          deviceType="mobile"
          selectedTags={this.props.selectedTags}
          sortBy={this.props.sortBy}
          tags={this.props.tags}
          urlQueries={this.props.urlQueries}
        />
      </div>
    );
  }
}

export default SortFilterMobile;
