const lotNumberFull = (state = '', action) => {
  let newState = state;
  switch (action.type) {
    case 'CHANGE_LOT':
    case 'CHANGE_LOT_NO_MAKER':
      // convert lotNumberFull to string if it's a number
      newState = (!isNaN(action.payload.lotNumberFull)) ?
        action.payload.lotNumberFull.toString() :
      action.payload.lotNumberFull;
      break;
    default:
      break;
  }
  return newState;
};

const auction = (state = {}) => state;

const lots = (state = []) => state;

const saleNumber = (state = 'NY00000') => state;

export {
  lotNumberFull,
  lots,
  saleNumber,
  auction
};
