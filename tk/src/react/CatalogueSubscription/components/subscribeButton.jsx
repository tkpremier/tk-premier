import React, { Component } from 'react';
import { CatalogueSubContext } from '../CatalogueSubscription.root'

 class SubscribeButton extends Component {
   render(){
     const { code } = this.props  
     
     return (
       <CatalogueSubContext.Consumer>{(context)=>{
         const {openModal, storeForm}= context
         const html = ( <iframe src= {`${storeForm}+${code}`} /> )

         return(

       <div>
     <button className="button cart" onClick={()=>openModal(html)}> Subscribe </button>
    </div>
         )
       }}
      </CatalogueSubContext.Consumer>
     )
     }
    };


export default SubscribeButton;
