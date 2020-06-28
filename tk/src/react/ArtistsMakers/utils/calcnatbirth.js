import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';

// creates string to display nationality, birthYear & deathYear depending on available info

export const calcNatBirthDisplay = (props) => {
  let makerNatBirth = '';
  if (!isNull(props.nationality) && !isEmpty(props.nationality)) {
    makerNatBirth = props.nationality;
  }
  if (!isEmpty(props.birthYear) && !isNull(props.birthYear) && props.birthYear !== 'N/A') {
    if (!isNull(props.nationality) && !isEmpty(props.nationality)) {
      makerNatBirth = `${makerNatBirth} \u2022 `;
    }
    if (!isNull(props.deathYear) && !isEmpty(props.deathYear) && props.deathYear !==
      'N/A') {
      makerNatBirth = `${makerNatBirth}${props.birthYear} - ${props.deathYear}`;
    } else {
      if (props.birthYear !== null && props.birthYear !== 'N/A') {
        makerNatBirth = `${makerNatBirth}b. ${props.birthYear}`;
      }
    }
  }
  return makerNatBirth;
};
