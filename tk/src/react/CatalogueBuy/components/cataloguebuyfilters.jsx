// import React, { Component } from 'react';
// import { CatalogueBuyContext } from '../CatalogueBuy.root';


// class CatalogueBuyFilter extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     const { data } = this.props.state;
//     const years = Object.values(data.reduce((acc, obj) => {
//       if (!acc[obj.startDate.slice(0, 4)]) acc[obj.startDate.slice(0, 4)] = obj.startDate.slice(0, 4);
//       return acc;
//     }, {})).sort((a, b) => b - a);

//     const departments = Object.values(data.reduce((acc, obj) => {
//       if (!acc[obj.departmentName.toLowerCase()]) acc[obj.departmentName.toLowerCase()] = obj.departmentName;
//       return acc;
//     }, {})).sort();

//     const locations = Object.values(data.reduce((acc, obj) => {
//       if (!acc[obj.locationName.toLowerCase()]) acc[obj.locationName.toLowerCase()] = obj.locationName;
//       return acc;
//     }, {})).sort();
//     return (
//       <ul
//         id="filter-backbone"
//         className="filter short-list col-xs-6 col-md-12"
//       >
//         <li className="header expandable closed">
//           <a href="#" className="toggle">
//                 Filter
//           </a>
//           <a className="clearall" href="#">
//                 (clear all)
//           </a>
//           <ul className="filter-list hide">
//             <li className="expandable closed">
//               <a
//                 href="#"
//                 className="toggle category"
//                 data-dimension="Year"
//               >
//                     Year
//               </a>
//               <ul className="panel hide">
//                 <li className="loading">{years.map(year => <a href="#">{year}</a>)}</li>
//               </ul>
//             </li>
//             <li className="expandable closed">
//               <a
//                 href="#"
//                 className="toggle category"
//                 data-dimension="Department"
//               >
//                     Department
//               </a>
//               <ul className="panel hide">

//                 <li className="loading">{departments.map(department => <a href="#">{department}</a>)}</li>
//               </ul>
//             </li>
//             <li className="expandable closed">
//               <a
//                 href="#"
//                 className="toggle category"
//                 data-dimension="Location"
//               >
//                     Location
//               </a>
//               <ul className="panel hide">

//                 <li className="loading">{locations.map(location => <a href="#">{location}</a>)}</li>
//               </ul>
//             </li>
//           </ul>
//         </li>
//       </ul>
//     );
//   }
// }

// export default CatalogueBuyFilter;
