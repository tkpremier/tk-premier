const React = require('react');
const ReactDOMServer = require('react-dom/server');

import { AuctionPage } from './react/AuctionPage/AuctionPage.root';
import { BuyNow } from './react/BuyNow/BuyNow.root';
import { HomePage } from './react/HomePage/HomePage.root';
import { LotPage } from './react/LotPage/LotPageServer.root';

class ServerFactory {
  constructor() {
    this.getSsr = this.getSsr.bind(this);
    this.AuctionPage = AuctionPage;
    this.BuyNow = BuyNow;
    this.Home = HomePage;
    this.LotPage = LotPage;
  }
  getSsr(str = 'Home', props = {}) {
    const Component = this[str];
    return ReactDOMServer.renderToString(<Component {...props} />);
  }
}

export default ServerFactory;
