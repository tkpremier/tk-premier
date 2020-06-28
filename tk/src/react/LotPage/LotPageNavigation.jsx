import React from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import {
  find, findIndex, trim, isUndefined
} from 'lodash/fp';
import { changeLot, changeLotNoMaker } from './actions';


const LotPageNavigation = (props) => {
  const currentIndex = findIndex(lot => lot.lotNumberFull === props.currentLotNumberFull)(props.lots);
  let nextLot = props.lots[currentIndex + 1];
  if (isUndefined(nextLot)) { nextLot = props.lots[0]; }
  let previousLot = props.lots[currentIndex - 1];
  if (isUndefined(previousLot)) { previousLot = props.lots[props.lots.length - 1]; }

  const findLot = comparator => find(lot => trim(lot.lotNumberFull) === trim(comparator));
  const options = props.lots.map((lot) => {
    return (
      <option
        value={trim(lot.lotNumberFull)}
      >
        {trim(lot.lotNumberFull)}
      </option>
    );
  });
  const onChange = (e) => {
    const { makerName, saleNumber, lotNumberFull } = findLot(e.target.value)(props.lots);
    
    props.dispatch(!makerName || makerName.toUpperCase() === 'NOARTIST'
      ? changeLotNoMaker({
        saleNumber,
        lotNumberFull: trim(lotNumberFull)
      })
      : changeLot({
        makerName,
        saleNumber,
        lotNumberFull: trim(lotNumberFull)
      }));
  };
  return (
    <div className="phillips-pagination">
      <Link
        className="arrow previous"
        to={!previousLot.makerName || previousLot.makerName.toUpperCase() === 'NOARTIST'
          ? changeLotNoMaker({
            saleNumber: previousLot.saleNumber,
            lotNumberFull: trim(previousLot.lotNumberFull)
          })
          : changeLot({
            makerName: previousLot.makerName,
            saleNumber: previousLot.saleNumber,
            lotNumberFull: trim(previousLot.lotNumberFull)
          })
        }
      />
      <nav className="page-select">
        <select name="lotNumber" value={trim(props.currentLotNumberFull)} onChange={onChange}>
          {options}
        </select>
        <span>
          of {props.lots.length} lots
        </span>
      </nav>
      <Link
        className="arrow next"
        to={!nextLot.makerName || nextLot.makerName.toUpperCase() === 'NOARTIST'
          ? changeLotNoMaker({
            saleNumber: nextLot.saleNumber,
            lotNumberFull: trim(nextLot.lotNumberFull)
          })
          : changeLot({
            makerName: nextLot.makerName,
            saleNumber: nextLot.saleNumber,
            lotNumberFull: trim(nextLot.lotNumberFull)
          })
        }
      />
    </div>);
};

LotPageNavigation.propTypes = {
  history: PropTypes.objectOf({
    push: PropTypes.func,
    replace: PropTypes.func
  }),
  lots: PropTypes.array,
  currentLotNumberFull: PropTypes.string,
  saleNumber: PropTypes.string
};

export default LotPageNavigation;
