import { createSelector } from 'reselect';
import { find } from 'lodash/fp';

const lotNumberFullSelector = state => state.lotNumberFull;
const lotsSelector = state => state.lots;

export const currentLotSelector = createSelector([lotNumberFullSelector, lotsSelector],
  (lotNumberFull, lots) => find(lot => lot.lotNumberFull.trim() === lotNumberFull.trim())(lots)
);