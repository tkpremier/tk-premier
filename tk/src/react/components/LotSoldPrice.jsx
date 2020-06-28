import formatEstimate from '../utils/formatEstimate';

const LotSoldPrice = (props) => {
  const classStr = (props.className) ? props.className : 'sold';

  if (props.isOnlineSale && props.soldOnline) {
    return (<p className="sold">BIDDING NO LONGER AVAILABLE</p>);
  }

  if (props.hammerPlusBP) {
    if (!props.showSoldPrice) {
      return (<p className="sold">SOLD</p>);
    }
    return (props.children) ? props.children : (<p className={classStr}>Sold for {props.currencySign}{formatEstimate(props.hammerPlusBP)}</p>);
  }

  if (props.isSoldOverride && (!props.hammerPlusBP || props.hammerPlusBP <= 0)) {
    return (<p className="sold">SOLD</p>);
  }
  return null;
};

export default LotSoldPrice;
