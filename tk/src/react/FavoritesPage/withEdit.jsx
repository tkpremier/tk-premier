import classNames from 'classnames';
import find from 'lodash/fp/find';

const withEdit = (WrappedComponent, editing) => (props) => {
  const isChecked = find(({ lotNumberFull, saleNumber }) => (props.lotNumberFull === lotNumberFull && props.saleNumber === saleNumber))(props.editingLotList.lots);
  return (
    <li className="col-xs-6 col-sm-3 lot">
      {editing && props.editingLotList.updateProp === 'lots'
        ? (
          <button
            className={classNames({
              'lot-list__lot__button': true,
              'lot-list__lot__button--checked': Boolean(isChecked)
            })}
            data-lot-number-full={props.lotNumberFull}
            data-sale-number={props.saleNumber}
            onClick={props.updateEditingLots}
            type="button"
            value={`Remove Lot ${props.lotNumberFull} from Sale ${props.saleNumber} for List ${props.listId}`}
          />
        )
        : null
      }
      <WrappedComponent
        {...props}
        imageTransformation="HomePageCarousel"
        showLotNumber={false}
        toggleEstHammer
      />
    </li>
  );
}

export default withEdit;
