import React, { Component } from 'react';
import CatalogueItem from './catalogueItem'

class CatalogueDepartment extends Component {
  render() {

const { departmentName, catalogueSubscriptions } = this.props

    return (
        <div>
            <h2 className="triple-top">SEASONAL {departmentName} SUBSCRIPTIONS</h2>
                <ul className="standard-list bordered">
                {catalogueSubscriptions.map(catalogue=>{
                    return <CatalogueItem {...catalogue}></CatalogueItem>
                })}
                </ul>
        </div>
        
    )
}
}

export default CatalogueDepartment;
