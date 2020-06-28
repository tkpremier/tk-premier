
const getPhillipsBackboneProperty = jest.genMockFromModule('../../utils/getPhillipsBackboneProperty');

const __MockedPhillipsEvents = {
  trigger: event => event
};

export default () => {
  const deferred = new Promise(resolve => resolve(__MockedPhillipsEvents));
  return deferred;
};