import React from 'react';
import reduce from 'lodash/reduce';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import upperFirst from 'lodash/upperFirst';

/*
  In our current lot model all chinese translations keys are prefixed with a c.
  This Higher Order Component provides its component with a getTranslatedString method
  which return the correct text from a property.
*/

const PhillipsTranslations = Component => (props) => {
  const translationStrings = reduce(props, (result, value, key) => {
    const res = result;
    // find chinese translation using our convention ex: circa => cCirca;
    let chineseTranslation = props[`c${upperFirst(key)}`];
    // only add property to translationString if chinese translation exists
    if (!isUndefined(chineseTranslation)) {
      if (!isNull(chineseTranslation) && chineseTranslation.length === 0) {
        chineseTranslation = null;
      }
      res[key] = { 'en-US': value, 'zh-HK': chineseTranslation };
    } else {
      res[key] = { 'en-US': value};
    }
    return res;
  }, {});
  const getTranslatedString = (key, lang) => {
    let translatedString;
    const translations = translationStrings[key];
    if (isUndefined(translations)) {
      translatedString = props[key];
      if (isUndefined(translatedString)) {
        console.warn(`component has no such property: ${key}`);
        translatedString = '';
      }
    } else {
      translatedString = translations[lang];
      if (isNull(translatedString)) {
        // default to english if translation is undefined or null;
        translatedString = translations['en-US'];
      }
    }
    return translatedString;
  };
  return (<Component {...props} getTranslatedString={getTranslatedString} />);
};

export default PhillipsTranslations;
