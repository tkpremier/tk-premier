import { find, flatMap } from 'lodash/fp';
import createInitialUserState from '../PhillipsUser/createInitialUserState';
import checkEnabled from '../PhillipsFilter/utils/checkEnabled';

const getSaleLots = (saleNumbers, lots) => flatMap(saleNumber => lots.filter(lot => lot.saleNumber === saleNumber))(saleNumbers);

const getUrlQueries = (location) => {
  const urlSplits = location.split('/');
  const saleNumber = urlSplits.indexOf('sale') > -1
    ? urlSplits[urlSplits.indexOf('sale') + 1]
    : '';
  const filter = urlSplits.indexOf('filter') > -1
    ? urlSplits[urlSplits.indexOf('filter') + 1]
    : '';
  const sort = urlSplits.indexOf('sort') > -1
    ? urlSplits[urlSplits.indexOf('sort') + 1]
    : '';
  const saleNumbers = saleNumber.length > 0
    ? saleNumber.split('-')
    : [];
  return {
    saleNumber,
    filter,
    sort,
    saleNumbers
  };
};

const getInitialState = ({ auctions, location, lots, tags, upcomingLotsDesc, upcomingLotsTitle, userJSON }) => {
  const urlQueries = getUrlQueries(location);
  const { filter, saleNumbers } = urlQueries;
  const initialLots = saleNumbers.length > 0 ? getSaleLots(saleNumbers, lots) : lots;
  return {
    auctions,
    filterData: {
      stateToFilter: ['lots'],
      relevantProps: [
        'currencySign',
        'lotNumberFull',
        'lowEstimate',
        'hammerPlusBP',
        'makerName',
        'tags'
      ],
      filterDimensions: [
        {
          'dimension': 'tags',
          'label': 'filters',
          'enabled': checkEnabled('tags'),
          'items': tags.map(tag => ({
            ...tag,
            'dimension': 'tags',
            'payload': tag,
            'status': 'inactive',
            'label': tag.tagName
          }))
        }
      ]
    },
    sortOptions: [
      {
        label: 'Auction Date',
        value: 'eventDate'
      },
      {
        label: 'Artist',
        value: 'makerName'
      },
      {
        label: 'Title',
        value: 'description'
      }
    ],
    hasFeaturedSale: saleNumbers.length > 0,
    lots: initialLots,
    tags: tags,
    upcomingLotsDesc,
    upcomingLotsTitle,
    urlQueries,
    ...createInitialUserState(JSON.parse(userJSON))
  };
}

export default getInitialState;
