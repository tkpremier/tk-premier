import 'fetch-ponyfill';
import React, { PureComponent, Fragment } from 'react';
import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import serialize from 'form-serialize';
import Carousel from '../../PhillipsCarousel/PhillipsCarousel';
import PhillipsLot from '../../PhillipsLot/PhillipsLot';
import HighlightsItemEditor from './HighlightsItemEditor.container';

class DeptCarouselEditor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeField: props.active,
      lotNumberField: props.editingLotNumber,
      saleNumberField: props.editingSaleNumber,
      displayOrderField: props.editingDisplayOrder,
      carouselTitleField: props.editingCarouselTitle,
      positionUpdateSuccess: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const changes = [
      { propKey: 'editingLotNumber', stateKey: 'lotNumberField' },
      { propKey: 'editingSaleNumber', stateKey: 'saleNumberField' },
      { propKey: 'editingDisplayOrder', stateKey: 'displayOrderField' }
    ].reduce((res, edit) => {
      if (this.props[edit.propKey] !== nextProps[edit.propKey]) {
        res[edit.stateKey] = nextProps[edit.propKey]
      }
      return res;
    }, {});
    if (!isEmpty(changes)) this.setState(changes);
  }

  setSubmitLabel() {
    let submitLabel = 'Update Carousel';
    if (this.props.departmentLotId !== 0) {
      submitLabel = this.props.deleting ? 'Delete Lot' : 'Edit Lot';
    }

    return this.props.pending ? 'Editing' : submitLabel;
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      deleting
    } = this.props;
    return deleting
      ? this.props.deleteItem({ formData: serialize(e.target, { hash: true }) })
      : this.props.updateComponent({
        ...this.props,
        formData: serialize(e.target, { hash: true })
      });
  }

  handleChange(e) {
    e.persist();
    this.setState((state) => {
      return {
        ...state,
        [`${e.target.name}Field`]: e.target.name === 'active'
          ? Boolean(parseInt(e.target.value, 10))
          : e.target.value
      }
    });
  }

  handlePositionChange(e) {
    e.persist();
    const { componentType, departmentId, updatePosition } = this.props;
    const payload = {
      url: `/api/departments/${departmentId}/carousel-position/${e.target.value}`,
      componentType
    };
    updatePosition(payload);
  }

  render() {
    const formClasses = classNames('inline carousel-editor__form', { 'delete': this.props.deleting });
    const submitClass = classNames({
      'pending': this.props.pending
    });
    const { componentType, editable, position } = this.props;
    return (
      <div
        className={classNames('container', {
          'carousel-editor': editable,
          'carousel-editor--buy-now': editable && componentType === 'buyNowCarousel'
        })}
      >
        <div
          className="carousel-editor departments row"
          id={this.props.departmentName}
        >
          {this.props.saved ?
            <p className="save-success">Carousel successfully updated</p> :
            null
          }
          {this.props.erred ?
            <p className="save-error">{this.props.error}</p> :
            null
          }
          <form className={formClasses} onSubmit={this.handleSubmit}>
            {this.props.itemUniqueId > 0
              ? <input type="hidden" name="itemUniqueId" value={this.props.itemUniqueId} />
              : null
            }
            <input type="hidden" name="carouselId" value={this.props.carouselId} />
            <input
              name="departmentLotId"
              type="hidden"
              value={parseInt(this.props.departmentLotId, 10) > 0
                ? this.props.departmentLotId
                : 0
              }
            />
            <div className="title-input-wrapper">
              <input
                type="text"
                name="carouselTitle"
                placeholder="Carousel Title"
                value={this.state.carouselTitleField}
                onChange={this.handleChange}
                id="carouselTitle"
                className="title-input"
              />
              {this.props.componentType === 'buyNowCarousel'
                ? (
                  <div className="active-wrapper">
                    Active:&nbsp;&nbsp;
                    <label htmlFor="active-true">
                      <input
                        type="radio"
                        name="active"
                        id="active-true"
                        onChange={this.handleChange}
                        checked={this.state.activeField}
                        value={1}
                      />
                      True
                    </label>
                    <label htmlFor="active-false">
                      <input
                        type="radio"
                        name="active"
                        id="active-false"
                        checked={!this.state.activeField}
                        onChange={this.handleChange}
                        value={0}
                      />
                      False
                    </label>
                  </div>
                )
                : null
              }
            </div>
            <input type="text" name="saleNumber" placeholder="Sale Number" value={this.state.saleNumberField} onChange={this.handleChange} />
            <input type="text" name="lotNumber" placeholder="Lot Number" value={this.state.lotNumberField} onChange={this.handleChange} />
            <select name="displayOrder" value={this.state.displayOrderField} onChange={this.handleChange}>
              <option value={0}>Display Order</option>
              {this.props.displayOrderList.map(i =>
                <option key={i} value={i}>{i}</option>
              )}
            </select>
            <p className="delete-msg">Are you sure you want to delete this lot?</p>
            <input type="hidden" value={this.props.currentCarouselTitle} name="currentCarouselTitle" />
            <input type="hidden" value={this.props.departmentId} name="departmentId" />
            <input type="submit" className={submitClass} value={this.setSubmitLabel()} />
            {this.props.highlightId !== 0
              ? (
                <button
                  className="carousel-editor__button carousel-editor__button--border-white"
                  onClick={this.props.handleCancel}
                  type="button"
                  value={this.props.departmentId}
                >
                  Cancel
                </button>
              )
              : null
            }
          </form>
          <Carousel>
            {this.props.carouselItems.map((lot) => {
              return (
                <HighlightsItemEditor
                  componentType={componentType}
                  {...lot}
                >
                  <PhillipsLot
                    {...lot}
                    editable
                    showLotNumber={false}
                    toggleEstHammer
                  />
                </HighlightsItemEditor>
              );
            })}
          </Carousel>
          {componentType !== 'buyNowCarousel'
            ? (
              <form>
                <label
                  htmlFor="carousel-position"
                >Carousel Position</label>
                &nbsp;&nbsp;&nbsp;
                <select
                  name="carouselPosition"
                  id="carousel-position"
                  defaultValue={position}
                  onChange={this.handlePositionChange}
                >
                  <option key={0}>Select:</option>
                  <option key={1} value={1}>Below Hero</option>
                  <option key={2} value={2}>Below Past Auctions</option>
                </select>
                &nbsp;&nbsp;&nbsp;
                {this.state.positionUpdateSuccess
                  ? <span>✓</span>
                  : null
                }
              </form>
            )
            : null
          }
        </div>
      </div>
    );
  }
};

DeptCarouselEditor.defaultProps = {
  active: false,
  carouselId: 9999,
  carouselItems: [],
  data: { 'title': '', lots: [], carouselItems: [] },
  deleting: false,
  departmentLotId: 0,
  displayOrderList: [],
  editing: false,
  editingLotNumber: '',
  editingSaleNumber: '',
  editingDisplayOrder: '',
  editingCarouselTitle: '',
  erred: false,
  error: '',
  itemUniqueId: 0,
  pending: false,
  saved: false
};

DeptCarouselEditor.propTypes = {
  active: PropTypes.bool,
  carouselId: PropTypes.number,
  carouselItems: PropTypes.arrayOf(PropTypes.object),
  componentType: PropTypes.string.isRequired,
  data: PropTypes.shape({ 'title': '', lots: [], carouselItems: [] }),
  deleting: PropTypes.bool,
  departmentId: PropTypes.number.isRequired,
  departmentLotId: PropTypes.number,
  departmentName: PropTypes.string.isRequired,
  displayOrderList: PropTypes.arrayOf(PropTypes.number),
  editing: PropTypes.bool,
  editingComponentType: PropTypes.string.isRequired,
  editingLotNumber: PropTypes.number,
  editingSaleNumber: PropTypes.string,
  editingDisplayOrder: PropTypes.number,
  editingCarouselTitle: PropTypes.string,
  erred: PropTypes.bool,
  error: PropTypes.string,
  handleCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  itemUniqueId: PropTypes.number,
  pending: PropTypes.bool,
  saved: PropTypes.bool
};

export default DeptCarouselEditor;
