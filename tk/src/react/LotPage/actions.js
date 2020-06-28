
const changeLot = (payload) => {
  return {
    type: 'CHANGE_LOT',
    payload
  };
};

const changeLotNoMaker = (payload) => {
  return {
    type: 'CHANGE_LOT_NO_MAKER',
    payload
  };
};

export {
  changeLot,
  changeLotNoMaker
};
