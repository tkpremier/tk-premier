import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import PhillipsLot from '../../PhillipsLot/PhillipsLot';
import withEdit from '../withEdit';
import listPropTypes, { defaultEditingLotList, defaultList, editingLotListPropTypes } from '../proptypes';

const lotsCount = length => `${length} Lot${length > 1 ? 's' : ''}`;

const LotList = ({ deleteList, editList, editingLotList, list, updateEditingLots, updateList }) => {
  const editing = editingLotList.id === list.id;
  const EditableLot = withEdit(PhillipsLot, editing);
  const Lots = list.lots
    ? list.lots.map(lot => (
      <EditableLot
        {...lot}
        editing={editing}
        editingLotList={editingLotList}
        key={`${list.id}-${lot.saleNumber}-${lot.lotNumberFull}`}
        listId={list.id}
        updateEditingLots={updateEditingLots}
      />
    ))
    : null;

  return (
    <div className="row lot-list" id={`lot-list-${list.id}`}>
      <form className="lot-list__form lot-list__name" onSubmit={updateList}>
        {list.name.length > 0 && (!editing || (editing && editingLotList.updateProp !== 'name'))
          ? (
            <p className="lot-list__p">
              <strong className="lot-list__p--strong">{list.name}</strong>
              &nbsp;&nbsp;
              {list.lots?.length > 0 ? lotsCount(list.lots.length) : null}
              <button
                className="lot-list__button lot-list__button--no-border"
                data-enable
                data-update-prop="name"
                onClick={editList}
                type="button"
              >
                Edit
              </button>
            </p>
          )
          : (
            <Fragment>
              <input
                className="lot-list__input--text"
                name="name"
                type="text"
                defaultValue={list.name}
                placeholder="Enter a name for this list"
              />
              <button className="lot-list__button" type="submit">Save</button>
              <button
                className="lot-list__button lot-list__button--no-border"
                data-enable={false}
                data-update-prop=""
                onClick={editList}
                type="button"
              >
                Cancel
              </button>
            </Fragment>
          )
        }
      </form>
      <form className="lot-list__management" onSubmit={updateList}>
        <button className="lot-list__button" onClick={deleteList} type="button">Delete List</button>
        {editing && editingLotList.updateProp === 'lots'
          ? (
            <Fragment>
              <button className="lot-list__button" data-enable={false} data-update-prop="" onClick={editList} type="button">Cancel Edit</button>
              <button className="lot-list__button" type="submit">Remove Lots</button>
            </Fragment>
          )
          : <button className="lot-list__button" data-enable data-update-prop="lots" onClick={editList} type="button">Edit Lots</button>
        }
      </form>
      <form className="lot-list__form lot-list__description" onSubmit={updateList}>
        <input type="hidden" name="name" value={list.name} />
        {list.description.length > 0 && (!editing || (editing && editingLotList.updateProp !== 'description'))
          ? (
            <p className="lot-list__p">
              {list.description}
              <button
                className="lot-list__button lot-list__button--no-border"
                data-enable
                data-update-prop="description"
                onClick={editList}
                type="button"
              >
                Edit
              </button>
            </p>
          )
          : (
            <Fragment>
              <input
                className="lot-list__input--text"
                name="description"
                type="text"
                defaultValue={list.description}
                placeholder="Enter a description for this list"
              />
              <button className="lot-list__button" type="submit">Save</button>
              {list.description.length > 0
                ? (
                  <button
                    className="lot-list__button lot-list__button--no-border"
                    data-enable={false}
                    data-update-prop=""
                    onClick={editList}
                    type="button"
                  >
                    Cancel
                  </button>
                )
                : null
              }
            </Fragment>
          )
        }
      </form>
      <ul className="lot-list__lots">
        {Lots}
      </ul>
    </div>
  );
};

LotList.defaultProps = {
  deleteList: null,
  editList: null,
  updateEditingLots: null,
  updateList: null,
  editingLotList: defaultEditingLotList,
  list: defaultList
};

LotList.propTypes = {
  deleteList: PropTypes.func,
  editList: PropTypes.func,
  updateEditingLots: PropTypes.func,
  updateList: PropTypes.func,
  list: listPropTypes,
  editingLotList: editingLotListPropTypes
};

export default LotList;
