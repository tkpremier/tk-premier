import PropTypes from 'prop-types';

import filter from 'lodash/fp/filter';

const Switch = ({ children, expression, className }) => {
  const classString = (className) ? className : 'no-style';
  let child = filter(c => c.props.case === expression)(children);
  return (<div className={classString}>{child}</div>);
};

const When = ({ children }) => children || null;

Switch.propTypes = {
  children: PropTypes.array,
  expression: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string
  ])
};

When.propTypes = {
  case: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string
  ]),
  default: PropTypes.bool
};

export { Switch, When };
