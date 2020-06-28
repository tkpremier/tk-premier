import { clone } from 'lodash';
import { filter } from 'lodash/fp';

export const filterData = (data, letter) =>
  clone(filter(maker => maker.makerName.startsWith(letter.toUpperCase())));

export const getCurrent = ({ currentPage, resultsPerPage, totalCount, totalPages }) => {
  let current = 0;
  if (currentPage === totalPages) {
    current = totalCount;
  } else {
    current = currentPage * resultsPerPage;
  }
  return current;
}
