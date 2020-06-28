import { reduce, isUndefined } from 'lodash/fp';

const getPrices = (lots) => {
  return reduce((result, lot) => {
    const price = lot.hammerPlusBP > 0 ? lot.hammerPlusBP : lot.lowEstimate;
    if (price > 0) {
      result.push(price);
    }
    return result;
  }, [])(lots);
};

export const getPriceList = (lots) => {
  const priceList = getPrices(lots);
  return priceList.sort((a, b) => a - b);
};

const getBoundsFromPriceString = (priceString = '', currencySign = '$') => {
  const notInt = new RegExp(/\D/g);
  const priceFilterArray = priceString.split(currencySign);
  const bounds = priceFilterArray.reduce((arr, str) => {
    const num = parseInt(str.replace(notInt, ''), 10);
    if (str.trim().toUpperCase() === 'UNDER') {
      arr.push(0);
    } else if (str.trim().toUpperCase() === 'OVER') {
      arr.push(Infinity);
    } else if (!isNaN(num)) {
      if (arr.indexOf(Infinity) > -1) {
        arr.unshift(num);
      } else {
        arr.push(num);
      }
    }
    return arr;
  }, []);
  return bounds;
}

export const checkPriceRange = (priceString = '', price = 0, currencySign = '$', bound = []) => {
  try {
    let priceFilterPasses = false;
    if (priceString.toUpperCase() === 'NO RESERVE') {
      return 'NO RESERVE';
    }
    let [lowBound, highBound] = bound;
    if (isUndefined(lowBound)) {
      [lowBound, highBound] = getBoundsFromPriceString(priceString, currencySign);
    }
    if (lowBound > 0) {
      priceFilterPasses = lowBound <= price && price <= highBound;
    } else if (highBound === Number.POSITIVE_INFINITY) {
      priceFilterPasses = highBound <= price;
    } else {
      priceFilterPasses = price <= highBound;
    }
    return priceFilterPasses;
  } catch (e) {
    return true;
  }
}
