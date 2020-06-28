import React from 'react';
import PropTypes from 'prop-types';
import LotList from './List.container';

const Lists = ({ userLotList }) => {
  // const LotLists = userLotList.length > 0
  //   ? userLotList.map(list => (
  //     <LotList
  //       id={list.id}
  //       key={`lots-list-${list.id}`}
  //       list={list}
  //     />
  //   ))
  //   : (
  //     <p className="no-lists">
  //       You have not created any lists. Please go to the&nbsp;<a href="/auctions">Auctions page</a>&nbsp;to start the process.
  //     </p>
  //   );
  return (
    <section className="panel" id="lists">
      <p className="no-lists">
        You have not created any lists. Please go to the&nbsp;<a href="/auctions">Auctions page</a>&nbsp;to start the process.
      </p>
    </section>
  );
};

Lists.defaultProps = {
  userLotList: []
};

Lists.propTypes = {
  userLotList: PropTypes.arrayOf(PropTypes.object)
};

export default Lists;
