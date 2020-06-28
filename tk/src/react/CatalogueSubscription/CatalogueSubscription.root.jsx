import React, {Component , createContext} from 'react';
import CatalogueDepartment from './components/catalogueDepartment'
import PhillipsModal from '../PhillipsModal/PhillipsModal';
import SideBar from './components/sideBar';

export const CatalogueSubContext = createContext();
export const CatalogueSubConsumer = CatalogueSubContext.Consumer;

class CatalogueSubscription extends Component {
  constructor(props){
    super(props);
    this.state = {
      cartIsOpen: false,
      modalChildren: null
    }

    this.hideModal = this.hideModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  hideModal(){
    this.setState({ cartIsOpen: false });
  }

  openModal(child){
    this.setState({ cartIsOpen : true, modalChildren : child })
  }

  render(){
    return (
      <CatalogueSubContext.Provider value={{openModal: this.openModal , storeForm: this.props.storeForm}}>
      <div>
        <div className="main-container">
          <div className="container content-area has-left-aside" id="catalogues-subscribe-page">
            <SideBar/>
            <div className="content-body col-xs-12 col-md-9">
              <h1>Catalogue Subscriptions</h1>
              <p>Subscribe to receive seasonal subscriptions for 20th Century &amp; Contemporary Art, Photographs, Design, Editions, Watches and Jewels catalogues.</p>
          {this.props.data.map(department=>{
            return <CatalogueDepartment {...department} handleOpenModal = {this.openModal}></CatalogueDepartment>
          })}
            </div>
          </div>
        </div>
        { this.state.cartIsOpen ? (<PhillipsModal hideModal = {this.hideModal}> { this.state.modalChildren } </PhillipsModal>) : null }
      </div>
        </CatalogueSubContext.Provider>
        );
      }
    }
    
  export { CatalogueSubscription };