import { createSelector } from 'reselect';
import { find, uniq, isUndefined, isEmpty } from 'lodash/fp';
import { parseFilterQuery } from '../utils/filterQueryUtils';

const lotsSelector = state => state.lots;
const urlQueriesSelector = state => state.urlQueries;
const filterDataSelector = ({ filterData }) => filterData;
const filterObjectSelector = ({ urlQueries }) => parseFilterQuery(urlQueries.filter);
const tagsSelector = ({ tags }) => tags;

const gridSelector = createSelector(
  filterDataSelector,
  filterObjectSelector,
  lotsSelector,
  tagsSelector,
  urlQueriesSelector,
  (filterData, filterObject, lots, tags, urlQueries) => {
    const { sort } = urlQueries;
    let gridLots = lots;
    if (!isEmpty(filterObject)) {
      const { tags: selectedTags } = filterObject;
      const ids = selectedTags.reduce((publicIds, tagName) => {
        const selectedTag = find(tag => tag.tagName === tagName)(tags);
        const lotPublicIds = selectedTag.lots.map(({ auctionLotPublicId }) => auctionLotPublicId);
        const newIds = publicIds.concat(lotPublicIds);
        return uniq(newIds);
      }, []);
      gridLots = ids.reduce((filteredLots, id) => {
        const lot = find(upcomingLot => id === upcomingLot.auctionLotPublicId)(lots);
        if (!isUndefined(lot)) {
          filteredLots.push(lot);
        }
        return filteredLots;
      }, []);
    }
    if (sort && sort.length > 0) {
      return gridLots.sort((a, b) => {
        switch (sort) {
          case 'makerName':
          case 'description':
            if (a[sort] < b[sort]) { return -1; }
            if (a[sort] > b[sort]) { return 1; }
            return 0;
          case 'eventDate':
          default:
            const ad = new Date(a.eventDate);
            const bd = new Date(b.eventDate);
            if (ad.getTime() < bd.getTime()) {
              return -1;
            }
            if (ad.getTime() > bd.getTime()) {
              return 1;
            }
            if (ad.getTime() > bd.getTime()) {
              const aLotNumber = parseInt(a.lotNumber, 10);
              const bLotNumber = parseInt(b.lotNumber, 10);
              return aLotNumber - bLotNumber;
            }
        }
      });
    }
    return gridLots;
  }
);

export {
  gridSelector
};
