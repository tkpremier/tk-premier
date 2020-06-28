import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import serialize from 'form-serialize';
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import { filter, find, flow } from 'lodash/fp';

const getLotFromList = (list, lot) => {
  return flow(
    filter(l => l.saleNumber === lot.saleNumber),
    find(l => l.lotNumberFull === lot.lotNumberFull)
  )(list);
};

const LotListItem = (props) => {
  const lotInList = getLotFromList(props.lots, props.lot);
  const active = !isUndefined(lotInList);
  const onClick = (e) => {
    e.preventDefault();
    props.saveLotToLotList(props.user.id, props.id, props.lot);
  };
  return (
    <li className={classNames('lot-list-item', { active })}>
      {active ?
        <p><strong>{props.name}</strong></p>
        :
        <a href="#" onClick={onClick}>{props.name}</a>
      }
      <span className="count">{props.lots.length}</span>
    </li>
  );
};

LotListItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  saveLotToLotList: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  lots: PropTypes.arrayOf(
    PropTypes.shape({
      saleNumber: PropTypes.string,
      lotNumber: PropTypes.number
    })
  ).isRequired,
  lot: PropTypes.shape({
    saleNumber: PropTypes.string,
    lotNumber: PropTypes.number
  }).isRequired
};

const LotLists = (props) => {
  const items = props.lotLists.map(listItem => {
    let error = null;
    if (!isNull(props.error)) {
      error = listItem.id === props.error.lotListId ? props.error : null;
    }
    return (
      <LotListItem
        {...listItem}
        error={error}
        user={props.user}
        lot={props.lot}
        saveLotToLotList={props.saveLotToLotList}
      />
    );
  });
  const onClick = (e) => {
    e.preventDefault();
    props.toggleForm();
  };
  return (
    <div className="lot-list-list">
      <ul className="lot-lists">
        {items}
      </ul>
      <div className="add-lot-list">
        <button className="phillips-lot-list__button phillips-lot-list__button--no-border" type="button" onClick={onClick}>+ New List</button>
      </div>
    </div>
  );
};

LotLists.defaultProps = {
  error: null,
  lotLists: [],
  user: {
    id: '0'
  }
};

LotLists.propTypes = {
  error: PropTypes.shape({
    errorType: PropTypes.string,
    message: PropTypes.string,
    lotListId: PropTypes.number
  }),
  lotLists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      Lots: PropTypes.arrayOf(
        PropTypes.shape({
          lotNumber: PropTypes.number,
          saleNumber: PropTypes.string
        })
      )
    })
  ),
  user: PropTypes.shape({
    id: PropTypes.string
  }),
  lot: PropTypes.shape({
    saleNumber: PropTypes.string,
    lotNumber: PropTypes.number
  }).isRequired,
  saveLotToLotList: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired
};

const LotListForm = ({ user, lot, saveLotList, error, toggleForm }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const list = {
      ...serialize(e.target, { hash: true }),
      userName: user.userName,
      lots: [lot]
    };
    saveLotList(user.id, list);
  };
  const onCancel = (e) => {
    e.preventDefault();
    toggleForm();
  };
  return (
    <div className="lot-list-form">
      {error ? <p className="error">{error.message}</p> : null}
      <form onSubmit={onSubmit}>
        <input name="name" placeholder="Name" type="text" />
        <textarea name="description" placeholder="Description" />
        <button className="phillips-lot-list__button" type="submit">Create</button>
        <button
          type="button"
          className="phillips-lot-list__button phillips-lot-list__button--no-border"
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

LotListForm.propTypes = {
  error: PropTypes.object,
  saveLotList: PropTypes.func,
  user: PropTypes.shape({
    userId: PropTypes.string,
    userName: PropTypes.string
  }),
  toggleForm: PropTypes.func,
  lot: PropTypes.shape({
    saleNumber: PropTypes.string,
    lotNumber: PropTypes.number
  })
};

const LotListHeader = ({ noLists, onClose, showForm }) => (
  <div className="phillips-lot-list__header">
    {noLists
      ? (
        <Fragment>
          <h3 className="phillips-lot-list__header__h3">Create your first list.</h3>
          <p>A way to share and manage lots.</p>
        </Fragment>
      )
      : <h3 className="phillips-lot-list__header__h3">{showForm ? 'New List' : 'My Lists'}</h3>
    }
    <button aria-label="Close List Management Module" className="phillips-lot-list__button--close phillips-lot-list__button" onClick={onClose} type="button">&#10006;</button>
  </div>
);

class LotList extends Component {
  state = {
    show: this.props.show,
    timeOutId: this.props.timeOutId,
    showForm: isArray(this.props.lotLists) ? this.props.lotLists.length <= 0 : true
  };

  componentWillReceiveProps({ lotLists, lot, show }) {
    const showForm = lotLists.length <= 0;
    if (isArray(lotLists) && lotLists.length !== this.props.lotLists.length) {
      this.setState(state => ({ ...state, showForm }));
    }
    if (this.state.show !== show) {
      this.setState(state => ({ ...state, show }));
    }
  }

  handleClose = () => {
    this.setState(state => ({
      ...state,
      show: false
    }));
  }

  toggleForm = () => {
    this.setState((state) => {
      const showForm = this.props.lotLists.length > 0 ? !state.showForm : true;
      const show = this.props.lotLists.length > 0;
      return {
        ...state,
        showForm,
        show
      };
    });
  };

  render() {

    const lotListCount = isArray(this.props.lotLists) ? this.props.lotLists.length : 0;
    return (
      <div
        className={classNames('phillips-lot-list',
          { 'phillips-lot-list--show': this.state.show })
        }
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        <div className="phillips-lot-list__wrapper">
          <LotListHeader
            noLists={lotListCount === 0}
            onClose={this.handleClose}
            showForm={this.state.showForm}
          />
          {
            this.state.showForm
              ? (
                <LotListForm
                  error={this.props.listError}
                  user={this.props.user}
                  lot={this.props.lot}
                  saveLotList={this.props.saveLotList}
                  toggleForm={this.toggleForm}
                />
              )
              : (
                <LotLists
                  error={this.props.itemError}
                  user={this.props.user}
                  lot={this.props.lot}
                  toggleForm={this.toggleForm}
                  lotLists={this.props.lotLists}
                  saveLotToLotList={this.props.saveLotToLotList}
                />
              )
          }
        </div>
      </div>
    );
  }
}

LotList.defaultProps = {
  show: false,
  lotLists: [],
  user: {
    userName: '',
    id: 0
  }
};

LotList.propTypes = {
  show: PropTypes.bool,
  listError: PropTypes.object,
  itemError: PropTypes.object,
  lotLists: PropTypes.array,
  user: PropTypes.shape({
    userName: PropTypes.string,
    id: PropTypes.string
  }),
  saveLotToLotList: PropTypes.func,
  saveLotList: PropTypes.func,
  lot: PropTypes.shape({
    saleNumber: PropTypes.string,
    lotNumber: PropTypes.number,
    lotNumberSuffix: PropTypes.string,
    lotNumberFull: PropTypes.string
  })
};

export default LotList;
