import React from 'react';
import isEmpty from 'lodash/isEmpty';
import uriEncoder from '../utils/uriencoder';
import { calcNatBirthDisplay } from './utils/calcnatbirth';
import FollowArtist from '../FollowArtist/FollowArtist';

const makerEditorial = (props) => {
  const style = {
    backgroundImage: `url(${props.editorial.coverUrl})`
  };
  const eyeBrow = isEmpty(props.editorial.articleSales) ?
    null : (
      <p className="eye-brow">{props.editorial.articleSales[0].auctionTitle}</p>);
  return (
    <div className="col-xs-12" id={`editorial-${props.editorial.flocklerId}`}>
      <div className="row">
        <a
          href={props.editorial.articleUrl}
          className="col-xs-12 col-sm-6 image"
          style={style}
        />
        <div className="col-xs-12 col-sm-6 editorial-desc">
          {eyeBrow}
          <a
            href={props.editorial.articleUrl}>
            <h2 className="editorial-title">{props.editorial.title}</h2>
          </a>
          <p>{props.editorial.summary}</p>
          <a href={`https://www.phillips.com/artist/${props.makerId}/${uriEncoder(props.makerName)}`}>
            <h3 className="name">{props.makerName}</h3>
          </a>
          <p className="nat-birth">{calcNatBirthDisplay(props)}</p>
          {props.env === 'web'
            ? (
              <FollowArtist
                makerId={props.makerId}
              />
            )
            : null
          }
        </div>
      </div>
    </div>
  );
};

export default makerEditorial;
