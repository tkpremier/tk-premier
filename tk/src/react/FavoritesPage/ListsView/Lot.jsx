import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { find, matches, isUndefined } from 'lodash/fp';
import PhillipsLot from '../../PhillipsLot/PhillipsLot';

const Lot = ({
  editable,
  editingLotList,
  editState,
  listId,
  lot,
  updateEditingLots,
}) => {
  const { saleNumber, lotNumberFull } = lot;
  const lotInEdits = find(matches({ saleNumber, lotNumberFull }))(editingLotList.lots);

  const handleDelete = () => {
    updateEditingLots({ saleNumber, lotNumberFull });
  }
  const className = editable ? classNames({
    'delete-lot': true,
    'checked': (!isUndefined(lotInEdits)) && (editingLotList.id === listId)
  }) : null;

  
  return (
    <article className="col-xs-6 col-sm-3 lot">
      <PhillipsLot
        {...lot}
        editable={editState}
        imageTransformation="HomePageCarousel"
        showLotNumber={false}
        toggleEstHammer
      />
      {editState
        ? <button className={className} onClick={handleDelete} type="button" value={`Remove Lot ${lotNumberFull} from Sale ${saleNumber} for List ${listId}`} />
        : null
      }
    </article>
  );
}

Lot.defaultProps = {
  editingLotList: {
    id: 0,
    lots: []
  }
}

Lot.propTypes = {
  maker: PropTypes.string.isRequired,
  detailLink: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  editState: PropTypes.bool.isRequired,
  saleNumber: PropTypes.string.isRequired,
  lotNumberFull: PropTypes.string.isRequired,
  updateEditingLots: PropTypes.func.isRequired,
  editingLotList: PropTypes.shape({
    id: PropTypes.number,
    lots: PropTypes.array
  })
}

export default Lot;