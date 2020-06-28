import omit from 'lodash/fp/omit';
import isUndefined from 'lodash/isUndefined';
import isEmpty from 'lodash/isEmpty';


const isDisabled = (item, { sameDimValues, otherDimValues }, dataPool) => {
  // TODO:  DOCUMENT BETTER
  // check to see if there are current values for same filter dimension OR
  // if there are NO OTHER active dimensions
  let disabled = false;
  if (isEmpty(otherDimValues) && (isEmpty(sameDimValues) || sameDimValues.length > 0)) {
    return disabled;
  }
  if (!isEmpty(otherDimValues)) {
    const { filterBy } = item;
    if (typeof filterBy === 'function') {
      // filterBy = checkPriceRange
      const { label, bound } = item;
      disabled = dataPool.filter(({ currencySign, hammerPlusBP, lowEstimate }) => filterBy(label, (hammerPlusBP || lowEstimate), currencySign, bound)).length === 0;
    } else {
      for (let i = 0; i < dataPool.length; i++) {
        const inactive = item.valueType === 'string' ? dataPool[i][filterBy].toUpperCase() === item.label.toUpperCase() : Boolean(dataPool[i][filterBy]);
        if (inactive) {
          disabled = !inactive;
          break;
        } else if (i === dataPool.length - 1 && !inactive) {
          disabled = true;
        }
      }
    }
  }
  return Boolean(disabled);
};
/**
 *
 * @param {object[]} dataPool - dataPool array to check against
 * @param {object} item - filter item to check
 * @param {object} currentFilterState - current filter object
 * @returns {string} Returns 'active/inactive/disabled' - active if value is in url, inactive if value is not in url but can be selected given current filter selections, disabled if option is not possible with current filter selections
*/
const setStatus = (dataPool, item, currentFilterState) => {
  const sameDimValues = isUndefined(currentFilterState[item.dimension])
    ? []
    : currentFilterState[item.dimension];
  const otherDimValues = isEmpty(omit(item.dimension)(currentFilterState))
    ? {}
    : omit(item.dimension)(currentFilterState);
  // console.log(`otherDimValues for ${item.dimension}: `, otherDimValues);
  const status = sameDimValues.indexOf(item.label) > -1
    ? 'active'
    : isDisabled(item, { sameDimValues, otherDimValues }, dataPool)
      ? 'disabled'
      : 'inactive';
  return status;
};

export default setStatus;
