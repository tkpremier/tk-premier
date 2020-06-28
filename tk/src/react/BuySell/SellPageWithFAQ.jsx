import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { Expandable } from '../Consignments/SellPage';


const SellPageWithFAQ = () => {
  return (
    <div className="main-container">
      <div className="container content-area has-left-aside" id="selling-page">
        <div className="row">
          <aside className="left col-xs-12 col-md-4 col-lg-3" id="primaryAside">
            <section>
              <ul className="short-list">
                <li className="contact expandable selected">
                  <a href="#">
                    Contact
                  </a>
                  <div className="panel">
                    <p>New York</p>
                    <p>+ 1 212 940 1200</p>
                    <a href="mailto:ClientServicesNewYork@phillips.com">ClientServicesNewYork@phillips.com</a>
                    <br />
                    <br />
                    <p>London</p>
                    <p>+ 44 20 7318 4010</p>
                    <a href="mailto:ClientServicesLondon@phillips.com">ClientServicesLondon@phillips.com</a>
                    <br />
                    <br />
                    <p>Hong Kong</p>
                    <p>+852 2318 2000</p>
                    <a href="mailto:ClientServicesHongKong@phillips.com">ClientServicesHongKong@phillips.com</a>
                    <br />
                  </div>
                </li>
              </ul>
            </section>
            <section className="back-to-top-section buySell">
              <a href="#" className="back-to-top" style={{ display: 'none' }}>
                Back to top
              </a>
            </section>
            <section className="sell-consignment">
              <h3>Sell with us&#46;</h3>
              <p>We are inviting consignment submissions for our upcoming sales&#46;</p>
              <a href="/sell">Submit now</a>
            </section>
          </aside>
          <div className="content-body col-xs-12 col-md-8 col-lg-9">
            <h1>How to Sell</h1>
            <ol className="standard-list">
              <li className="has-icon row">
                <div className="icon number col-xs-12 col-sm-1">1</div>
                <div className="content-body col-xs-12 col-sm-11">
                  <h2>Valuation Estimate</h2>
                  <p>
                    Phillips provides complimentary estimates for items which are suitable for sale with us.
                    Please submit items from your collection through our&nbsp;
                    <a href="/sell" target="_blank">online consignment form</a>.
                    One of our representatives will
                    then contact you to discuss your item and, where appropriate, to see the item in person.
                  </p>
                </div>
              </li>
              <li className="has-icon row">
                <div className="icon number col-xs-12 col-sm-1">2</div>
                <div className="content-body col-xs-12 col-sm-11">
                  <h2>When &amp; Where to Sell</h2>
                  <p>
                  Phillips conducts live and online-only auctions and exhibitions in New York, London, Geneva and Hong Kong throughout the year. A specialist will discuss with you the most appropriate timing and location to ensure the successful sale of your property.  If you prefer not to sell your property at auction, we can also sell your property <a href="/private-sales-department" target="_blank">privately</a>.
                  </p>
                </div>
              </li>
              <li className="has-icon row">
                <div className="icon number col-xs-12 col-sm-1">3</div>
                <div className="content-body col-xs-12 col-sm-11">
                  <h2>Consigning your Property</h2>
                  <p>Our consignment agreement sets out the terms and conditions upon which your property will be offered for sale. For auctions, our specialists will recommend an estimate range and a reserve (minimum) price for your property. We can also advise you on how to transport your property to us using your own shipper or one of our shipping partners.
                  </p>
                </div>
              </li>
              <li className="has-icon row">
                <div className="icon number col-xs-12 col-sm-1">4</div>
                <div className="content-body col-xs-12 col-sm-11">
                  <h2>Charges</h2>
                  <p>
                  For every item, Phillips charges the seller a vendor&rsquo;s commission and sale-related expenses which typically include insurance, transport (when using our shipping partners), any restoration costs and catalogue photography. Our specialists will discuss these charges with you at the time of consignment.
                  </p>
                </div>
              </li>
              <li className="has-icon row">
                <div className="icon number col-xs-12 col-sm-1">5</div>
                <div className="content-body col-xs-12 col-sm-11">
                  <h2>Payment</h2>
                  <p>After the auction or exhibition, Phillips will notify the seller as to the status of each item offered for sale. Provided payment has been received from the buyer, we will pay net sale proceeds (the hammer price less the vendor&rsquo;s commission and sale-related expenses) to the seller approximately 35 calendar days after the auction.  In the unlikely event that your property does not sell, we will be in touch to discuss next steps.</p>
                </div>
              </li>
            </ol>
            <h2>FAQ&rsquo;s</h2>
            <Expandable language="en" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPageWithFAQ;
