import React from 'react';
import has from 'lodash/has';
import FollowArtist from '../../FollowArtist/FollowArtist';
import uriEncoder from '../../utils/uriencoder';
import MakerEditor from '../../CMS/ArtistsMakers/MakerCarouselItemEditor.container';
import { calcNatBirthDisplay } from '../utils/calcnatbirth';

const MakerCarouselItem = (props) => {
  const keyId = has(props, 'keyId') ? props.keyId : props.id;
  const makerNameDashed = uriEncoder(props.makerName);
  const makerLink = props.env === 'web' ? `/artist/${props.makerId}/${makerNameDashed}` : '#';
  const imgSrc = (props.isNew && props.lotNumber === 0) ? '/img/add.svg' : props.imagePath;
  const bkgImg = { backgroundImage: `url(${imgSrc})` };
  return (
    <li id={`carousel-item-${keyId}-${props.makerCarouselId}`} style={props.style}>
      <MakerEditor {...props} keyId={keyId} />
      <a href={makerLink} className="col-xs-12">
        <div style={bkgImg} className="carousel-item-img" />
      </a>
      <a href={makerLink} className="col-xs-12">
        <h3 className="name">{props.makerName}</h3>
        <p className="nat-birth">{calcNatBirthDisplay(props)}</p>
      </a>
      {props.env === 'web'
        ? (
          <FollowArtist
            makerId={props.makerId}
          />
        )
        : null
      }
    </li>
  );
};

export default MakerCarouselItem;
