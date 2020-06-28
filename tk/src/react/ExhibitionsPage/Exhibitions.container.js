import { connect } from 'react-redux';
import ExhibitionsPage from './ExhibitionsPage';

// const mapStateToProps = (state) => {
//   let newFilteredCatalogues = filterPastAuctions(data, filter);
//   if (sort === 'oldest') {
//     newFilteredCatalogues = newFilteredCatalogues.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
//   } else {
//     newFilteredCatalogues = newFilteredCatalogues.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
//   }
//   return state;
// };

const mapStateToProps = state => state;

export default connect(mapStateToProps, null)(ExhibitionsPage);
