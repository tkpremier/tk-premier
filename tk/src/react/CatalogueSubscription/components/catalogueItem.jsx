import React, { Component } from 'react';
import SubscribeButton from './subscribeButton'


class CatalogueItem extends Component {
    constructor() {
        super()
      }
  
  render() {
const {description , price , code } = this.props

    return (
      <li className="subscribe row">
        <div className ="description col-xs-12 col-md-8">{description}</div>
        <div className="price col-xs-6 col-md-2"> ${price} US</div>
        <SubscribeButton code = {code}/>
      </li>
    )
}
}

export default CatalogueItem;
