import { connect } from 'react-redux';
import { filterPastAuctions } from './functions/functionIndex';
import PastAuctionsPage from './PastAuctions';

const mapStateToProps = ({ data, urlQueries, filterData }) => {
  const { filter, sort } = urlQueries;
  const filteredPastSales = filterPastAuctions(data, filter);
  if (sort === 'oldest') {
    filteredPastSales.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
  } else {
    filteredPastSales.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
  }
  return ({ filterData, filteredPastSales, urlQueries });
};


export default connect(mapStateToProps, null)(PastAuctionsPage);
