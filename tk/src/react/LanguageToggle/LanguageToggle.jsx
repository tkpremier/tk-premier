import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { includes } from 'lodash/fp';
import { changeLanguage } from './actions';

const LanguageToggle = (props) => {
  const onChange = (e) => {
    switch (e.target.checked) {
      case true: {
        props.changeLanguage('zh-HK');
        break;
      }
      default: {
        props.changeLanguage('en-US');
      }
    }
  };
  return (
    <div className="language-select">
      <span>
        <p>Select Language</p>
      </span>
      <div className="toggle-wrapper">
        <span
          className="toggle-lang"
          data-lang="en"
          onClick={() => props.changeLanguage('en-US')}
          role="button"
          tabIndex={0}
        >
          <p>English</p>
        </span>
        <input
          type="checkbox"
          id="lang"
          name="lang"
          className="switch"
          checked={includes('zh')(props.currentLanguage)}
          onChange={onChange}
        />
        <label htmlFor="lang" />
        <span
          className="hong-kong toggle-lang"
          data-lang="zh"
          onClick={() => props.changeLanguage('zh-HK')}
          role="button"
          tabIndex={0}
        >
          <p>中文</p>
        </span>
      </div>
    </div>
  );
};

LanguageToggle.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  changeLanguage: PropTypes.func.isRequired
};

const mapStateToProps = ({ currentLanguage, maker, saleNumber, lotNumberFull }) => {
  return { currentLanguage, maker, saleNumber, lotNumberFull };
};

const mapDispatchToProps = (dispatch) => {
  return { changeLanguage: language => dispatch(changeLanguage(language)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageToggle);
