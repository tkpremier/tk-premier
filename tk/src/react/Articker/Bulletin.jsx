import React, { useEffect } from 'react';
import isNull from 'lodash/isNull';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { configureStore } from '../../utils/configureStore';
import getPhillipsBackboneProperty from '../../utils/getPhillipsBackboneProperty';
import bindUserModel from '../PhillipsUser/bindUserModel';
import * as userReducers from '../PhillipsUser/reducers';
import FollowArtist from '../FollowArtist/FollowArtist';
import getInitialUserState from '../PhillipsUser/createInitialUserState';
import { bulletin } from './proptypes';

const BulletinItem = ({ item }) => {
  return (
    <li className="row articker__bulletin__item">
      <span className="articker__bulletin__item__ranking">{item.ranking}</span>
      <section className="articker__bulletin__item__description">

        <h2 className="articker__maker-name">
          {!isNull(item.makerUrl)
            ? (
              <a href={item.makerUrl}>{item.makerName}</a>
            )
            : `${item.makerName}`
          }
          {!isNull(item.makerId)
            ? (
              <FollowArtist
                makerId={item.makerId}
                makerName={item.makerName}
              />
            )
            : null
          }
        </h2>
        <div className="articker__bulletin__item__title" dangerouslySetInnerHTML={{ __html: item.htmlCaption }}>
        </div>
        {/* <span className="articker__domain">{item.domain}</span> */}
      </section>
    </li>
  );
}

BulletinItem.propTypes = {
  item: PropTypes.shape(bulletin).isRequired
};


const ArtickerBulletin = ({ data, userJSON }) => {
  const userState = getInitialUserState(JSON.parse(userJSON));
  const store = configureStore(
    { ...userReducers },
    { ...userState }
  );
  useEffect(() => {
    getPhillipsBackboneProperty('user').then((userModel) => {
      bindUserModel(userModel, store.dispatch);
    });
  }, []);
  return (
    <Provider store={store}>
      {data.map(item => <BulletinItem item={item} key={item.ranking} />)}
    </Provider>
  );
};

ArtickerBulletin.defaultProps = {
  data: [],
  userJSON: '{}'
};

ArtickerBulletin.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(bulletin)),
  userJSON: PropTypes.string
};

export { ArtickerBulletin };
