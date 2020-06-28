import createInitialUserState from '../PhillipsUser/createInitialUserState';

const getInitialState = ({ location, sale, userJSON }) => {
  return {
    ...createInitialUserState(JSON.parse(userJSON))
  };
};

export default getInitialState;
