import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { toggleListView } from './actions';

const CuratedViewToggle = () => {
  const { listViewType } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div className="curated-toggle">
      View:
      <span className="curated-toggle__button-wrapper">
        <button
          className={classNames(
            'curated-toggle__button curated-toggle__button--catalogue',
            { 'curated-toggle__button--active': listViewType === 'catalogue' }
          )}
          name="catalogue"
          onClick={() => dispatch(toggleListView('catalogue'))}
          type="button"
        >
          Catalogue
        </button>
        |
        <button
          className={classNames(
            'curated-toggle__button curated-toggle__button--grid',
            { 'curated-toggle__button--active': listViewType === 'grid' }
          )}
          name="grid"
          onClick={() => dispatch(toggleListView('grid'))}
          type="button"
        >
          Grid
        </button>
      </span>
    </div>
  );
};

export default CuratedViewToggle;
