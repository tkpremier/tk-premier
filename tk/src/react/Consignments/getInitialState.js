import isNull from 'lodash/isNull';
import createInitialUserState from '../PhillipsUser/createInitialUserState';

export const getSelectedMaker = (makerId = null, makerName = null) => {
  return {
    makerId: isNull(makerId) ? null : parseInt(makerId, 10),
    makerName: isNull(makerName) ? '' : makerName
  };
}

export const consignmentFormDefaultState = {
  analyticsUrl: '',
  error: {
    display: false,
    message: ''
  },
  files: [],
  images: [],
  mediumId: 0,
  makers: [],
  requestPending: false,
  success: {
    display: false,
    message: ''
  }
};

export default function ({ userJSON, language, makerId, makerName }) {
  const { user, userForm } = createInitialUserState(JSON.parse(userJSON));
  return {
    form: consignmentFormDefaultState,
    user,
    userForm,
    makers: [],
    selectedMaker: getSelectedMaker(makerId, makerName),
    language: language.toUpperCase() === 'CH' ? 'ch' : 'en'
  };
}
