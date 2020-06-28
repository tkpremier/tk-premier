import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { has, find, isUndefined } from 'lodash/fp';
import isUndefined from 'lodash/fp/isUndefined';
import PropTypes from 'prop-types';


class PhillipsSocialLegacy extends Component {
  componentDidMount() {
    // const bbSocial = new PhillipsSocialBackbone({
    //   el: ReactDOM.findDOMNode(this),
    //   model: new Backbone.Model(this.props),
    //   share: false,
    //   lot: this.props.lot,
    //   id: this.props.lotNumber,
    //   showLotList: this.props.showLotList
    // });
    console.log('js migration error in PhillipsSocialLegacy....convert');
    // if (phillips && phillips.Social) {
    //   const bbSocial = new PhillipsSocialBackbone({
    //     el: ReactDOM.findDOMNode(this),
    //     model: new Backbone.Model(this.props),
    //     share: false,
    //     lot: this.props.lot,
    //     id: this.props.lotNumber,
    //     showLotList: this.props.showLotList
    //   });
      
    //   if (this.props.onUnfavorite) {
    //     const phillipsFavorite = find(view => has('type')(view) && view.type === 'lot')(bbSocial.subviews);
    //     if (phillipsFavorite) {
    //       phillipsFavorite.on('unfavorite', this.props.onUnfavorite);
    //     }
    //   }
    // }
  }
  render() {
    const url = isUndefined(this.props.url) ? '#' : this.props.url;
    return <div className="phillips-social" href={url} />;
  }
}

PhillipsSocialLegacy.propTypes = {
	showLotList: PropTypes.bool,
	displayOrder: PropTypes.number,
	saleNumber: PropTypes.string,
	lotNumber: PropTypes.string,
	active: PropTypes.bool,
	lotNumberFull: PropTypes.string,
	editable: PropTypes.bool,
	onSelect: PropTypes.func,
	imagePath: PropTypes.string,
	detailLink: PropTypes.string,
	lowEstimate: PropTypes.number,
	highEstimate: PropTypes.number,
	currencySign: PropTypes.string,
	description: PropTypes.string,
	makerName: PropTypes.string,
	makerId: PropTypes.number,
	style: PropTypes.object,
	lot: PropTypes.bool
};

export default PhillipsSocialLegacy;
