import React from 'react';
import PropTypes from 'prop-types';


const CMSControls = ({
  addType,
  carouselId,
  children,
  editable,
  editType,
  elementProps,
  selectElement,
  showAdd,
  showEdit
}) => {
  const handleClick = ({ target }) => {
    const elementType = target.dataset.type === 'add'
      ? addType
      : editType;
    let totalCount = 0;
    if (Array.isArray(elementProps)) {
      totalCount = elementProps.length;
    } else if (carouselId > 0) {
      totalCount = elementProps.carouselItems.length;
    }
    if (target.dataset.type === 'add' && (addType === 'lot' || addType === 'maker')) {
      elementProps.id = 0;
    }
    elementProps.totalCount = totalCount;
    selectElement({
      elementProps,
      elementType
    });
  }
  return (
    <div className="add-button-wrapper">
      {editable && showEdit
        ? (
          <button
            className="btn edit-homepage"
            data-type="edit"
            type="button"
            onClick={handleClick}
          >
            Edit
          </button>
        )
        : null
      }
      {editable && showAdd
        ? (
          <button
            className="btn edit-homepage"
            data-type="add"
            onClick={handleClick}
            type="button"
          >
            Add {addType}
          </button>
        )
        : null
      }
      {children}
    </div>
  );
}

CMSControls.propTypes = {
  children: PropTypes.element,
  editType: PropTypes.string,
  addType: PropTypes.string,
  elementProps: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  showEdit: PropTypes.bool,
  showAdd: PropTypes.bool,
  selectElement: PropTypes.func.isRequired,
  editable: PropTypes.bool
};

export default CMSControls;
