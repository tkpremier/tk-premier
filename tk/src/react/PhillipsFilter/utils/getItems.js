import isNull from 'lodash/isNull';
import sortedUniqBy from 'lodash/fp/sortedUniqBy';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/fp/uniqBy';
import { parseFilterQuery } from '../../utils/filterQueryUtils';
import { getPriceList } from '../../utils/priceFilterUtils';
import getContentTypeDesc from '../../Editorial/Hub/getContentTypeDesc';

/**
 * A maker
 * @typedef maker - used in filters - artists dim
 * @property {string} status - 'active'/'inactive'/'disabled'
 * @property {string} label - Maker Name
 *
 * @param {object[]} lots
 * @param {string} filter
 * @return {maker[]} array of makers
 */

const getMakersList = (lots, filter) => {
  const filterObject = parseFilterQuery(filter);
  return sortedUniqBy(({ label }) => label)(lots
    .filter(({ makerName }) => makerName !== 'NoLot')
    .map(({ makerName, saleNumber, saleTypeId }) => ({
      label: makerName,
      saleNumber,
      saleType: saleTypeId === 1 ? 'auction' : 'exhibition',
      status: filterObject.artists && filterObject.artists.indexOf(makerName) > -1 ? 'active' : 'inactive',
      filterBy: 'makerName',
      valueType: 'string'
    }))
    .sort((a, b) => {
      if (a.label.toUpperCase() < b.label.toUpperCase()) {
        return -1;
      }
      if (a.label.toUpperCase() > b.label.toUpperCase()) {
        return 1;
      }
      return 0;
    }));
};

const getMediums = (items, filterObject = {}, key = 'discipline') => {
  const { saleNumber, saleTypeId } = items[0];
  const mediums = uniq(items.map(item => item[key]).filter(medium => !isNull(medium) && medium.length > 0));
  mediums.sort();
  return mediums.map(medium => ({
    label: medium,
    saleNumber: saleNumber,
    saleType: saleTypeId === 1 ? 'auction' : 'exhibition',
    status: filterObject.medium
      ? decodeURIComponent(filterObject.medium).toUpperCase().split('~').indexOf(medium.toUpperCase()) > -1
        ? 'active'
        : 'inactive'
      : 'inactive',
    filterBy: key,
    valueType: 'string'
  }));
};

/**
 * A price range
 * @typdef priceRange
 * @property {string} status - 'active'/'inactive'/'disabled'
 * @property {string} label - Price range label
 * @property {number[]} bounds - Price bounds [lowBound, highBound]
 *
 * @param {object[]} lots - list of lots to pass through getPriceList
 * @param {boolean} hasNoReserve - check to see if there's any lots w/ no reserves
 * @return {priceRange[]} an array of priceRanges
 */

const getPriceRanges = (lots) => {
  const priceList = getPriceList(lots);
  const { currencySign } = lots[0];
  // number of price ranges = 5
  const ranges = [0, 1, 2, 3, 4];
  // number of prices per range
  const fraction = Math.ceil(priceList.length / 5);
  const priceRanges = ranges.reduce((prevArray, currRange) => {
    const lowBoundIndex = (currRange === (ranges.length - 1) || currRange === 1)
      ? (currRange) * fraction
      : ((currRange * fraction) + 1);
    const highBoundIndex = (currRange + 1) * fraction;
    if (!Number.isNaN(priceList[lowBoundIndex])) {
      switch (currRange) {
        case 0:
          prevArray.push({
            label: `Under ${currencySign}${priceList[highBoundIndex]}`,
            status: 'inactive',
            filterBy: 'priceRangeSelector',
            valueType: 'number'
          });
          break;
        case ranges.length - 1:
          prevArray.push({
            label: `Over ${currencySign}${priceList[lowBoundIndex]}`,
            status: 'inactive',
            filterBy: 'priceRangeSelector',
            valueType: 'number'
          });
          break;
        default:
          prevArray.push({
            label: `${currencySign}${priceList[lowBoundIndex]} - ${currencySign}${priceList[highBoundIndex]}`,
            status: 'inactive',
            filterBy: 'priceRangeSelector',
            valueType: 'number'
          });
          break;
      }
    }
    return prevArray;
  }, []);
  return priceRanges;
};

const getContentTypes = (data, filter) => {
  const filterObject = parseFilterQuery(filter);
  return uniqBy(({ label }) => label)(data.map(({ contentType }) => ({
    label: getContentTypeDesc(contentType),
    status: filterObject.contentType?.indexOf(getContentTypeDesc(contentType)) > -1 ? 'active' : 'inactive',
    filterBy: 'contentType'
  })));
};

const getDepartmentNames = (data, filter) => {
  const filterObject = parseFilterQuery(filter);
  return uniqBy(({ label }) => label)(data.map(({ departmentName }) => ({
    'label': departmentName,
    'status': filterObject.contentType?.indexOf(departmentName) > -1 ? 'active' : 'inactive',
    'filterBy': 'departmentName'
  })));
};

export {
  getContentTypes,
  getDepartmentNames,
  getMakersList,
  getMediums,
  getPriceRanges
};
