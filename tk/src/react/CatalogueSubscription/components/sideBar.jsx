import React, { Component } from 'react';
import { CatalogueSubContext } from '../CatalogueSubscription.root';

class SideBar extends Component {
  render() {
    return (
      <CatalogueSubContext.Consumer>
        {(context) => {
          const { openModal, storeForm } = context;
          const html = <iframe src={storeForm} />;

          return (
            <aside className="left col-xs-12 col-md-3">
              <section>
                <ul className="short-list">
                  <li className="contact expandable closed">
                    <a href="#">CONTACT</a>
                    <div className="panel hide">
                      <p>
                        <a href="mailto:catalogues@phillips.com">
                          Catalogues Worldwide
                        </a>
                      </p>
                      <p>New York +1 212 940 1200</p>
                      <p>London +44 20 7318 4010</p>
                    </div>
                  </li>
                </ul>
              </section>
              <section>
                <button
                  className="button large"
                  onClick={() => openModal(html)}
                >
                  My Cart
<i className="cart"></i>
                </button>
              </section>
            </aside>
          );
        }}
      </CatalogueSubContext.Consumer>
    );
  }
}

export default SideBar;
