import createInitialUserState from '../../PhillipsUser/createInitialUserState';

const preloadedState = ({ data, editable, env, userJSON = '{}' }) => {
  return {
    autoComplete: {
      data: []
    },
    editable,
    env,
    makerCarousels: {
      data: data.makerCarousels,
      serverData: data.makerCarousels,
      modifiedId: null,
      editorResponse: {
        status: null,
        msg: ''
      }
    },
    search: {
      options: []
    },
    ...createInitialUserState(JSON.parse(userJSON))
  };
};

export default preloadedState;
