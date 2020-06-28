import { isNull } from 'lodash';
import createInitialUserState from '../PhillipsUser/createInitialUserState';

export const getSelectedMaker = (makerId = null, makerName = null) => {
  return {
    makerId: isNull(makerId) ? null : parseInt(makerId, 10),
    makerName: isNull(makerName) ? '' : makerName
  };
};

export const buySellDefaultState = {

};

export default function ({
  userJSON,
  language,
  makerId,
  makerName
}) {
  const { user } = createInitialUserState(JSON.parse(userJSON));
  return {
    form: buySellDefaultState,
    user,
    makers: [],
    selectedMaker: getSelectedMaker(makerId, makerName),
    language: language.toUpperCase() === 'CH' ? 'ch' : 'en'
  };
}
