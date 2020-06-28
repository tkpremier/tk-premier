import createInitialUserState from '../PhillipsUser/createInitialUserState';
import getUrlQueries from '../../utils/getUrlQueries';
import checkEnabled from '../PhillipsFilter/utils/checkEnabled';
import { getMakersList, getMediums } from '../PhillipsFilter/utils/getItems';
import { parseFilterQuery } from '../PhillipsFilter/utils/filterQueries';

const getFilterDimensions = (lots, filterQuery) => {
  const dimensions = [];
  const filter = parseFilterQuery(filterQuery);
  const mediums = getMediums(lots, filter);
  dimensions.push({
    'dimension': 'makers',
    'enabled': checkEnabled('makers'),
    'items': getMakersList(lots, filterQuery),
    'filterBy': ['makerName']
  });
  if (mediums.length > 0) {
    dimensions.push({
      'dimension': 'medium',
      'enabled': checkEnabled('medium'),
      'items': mediums,
      'filterBy': ['discipline']
    });
  }
  return dimensions;
};

const getInitialState = ({
  location,
  previewCuratedAuction,
  sale,
  userJSON
}) => {
  const urlQueries = getUrlQueries(location);
  // fix for WEB-4667 [PERPETUAL] - Change sold price text logic to be based on sale number
  const mappedSale = {
    ...sale,
    lots: sale.lots.map(lot => ({ ...lot, saleTypeId: 5 })),
    saleTypeID: 5
  };
  const listViewType = (previewCuratedAuction || mappedSale.enableCuratedAuction) ? 'catalogue' : 'grid';
  // hardcodes saleTypeID on sale level and saleTypeId on lot level to be 5
  return {
    filterData: {
      stateToFilter: ['sale', 'lots'],
      filterDataSelector: 'buyNow',
      relevantProps: [
        'currencySign',
        'discipline',
        'hammerPlusBP',
        'lotNumberFull',
        'lowEstimate',
        'isNoReserve',
        'makerName'
      ],
      filterDimensions: getFilterDimensions(mappedSale.lots, urlQueries.filter)
    },
    sortOptions: [
      {
        label: 'Default',
        value: 'default'
      },
      {
        label: 'Maker: A - Z',
        value: 'maker-asc',
        type: 'ascending'
      },
      {
        label: 'Maker: Z - A',
        value: 'maker-desc',
        direction: 'descending'
      }
    ],
    sale: mappedSale,
    listViewType,
    urlQueries,
    ...createInitialUserState(JSON.parse(userJSON))
  };
};

export default getInitialState;
