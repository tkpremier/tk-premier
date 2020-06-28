const initialState = ({ data, currentPage, resultsPerPage, totalCount, letter }) => {
  const currentCount = (totalCount > (currentPage * resultsPerPage)) ? currentPage * resultsPerPage : totalCount;
  let state = {
    letter: letter,
    data: data,
    currentPage: currentPage,
    currentCount: currentCount,
    totalCount: totalCount,
    isFetching: false
  };
  return state;
}

export default initialState;