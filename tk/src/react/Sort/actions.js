const clearFilter = () => ({
  type: 'CLEAR_FILTER'
})

const sortBy = ({ payload, type }) => {
  return {
    payload,
    type
  };
}

const toggleFilterByTag = (tag) => {
  return {
    type: 'TOGGLE_FILTER_BY_TAG',
    tag
  };
}

export {
  sortBy,
  toggleFilterByTag
};
