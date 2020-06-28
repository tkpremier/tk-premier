import isEmpty from 'lodash/isEmpty';
import Img from './components/image';
import FollowArtist from '../FollowArtist/FollowArtist';
import { calcNatBirthDisplay } from './utils/calcnatbirth';

const Featured = (props) => {
  const desc = isEmpty(props.landingDescription) ? props.biography : props.landingDescription;
  const url = `https://www.phillips.com/artist/${props.makerId}/${props.makerName.replace(' ', '-')}`;
  // const social = props.env === 'web'
  //   ? <FollowArtist makerId={props.makerId} />
  //   : null;
  const NoData = (
    <div className="row" id="featured-artist">
      <p>Please set a Featured Artist in the Phillips CMS - Maker Bio page.</p>
    </div>
  );
  const html = isEmpty(props.makerName) ? NoData : (
    <div className="row" id="featured-artist">
      <div className="featured-artist img col-xs-12 col-sm-6">
        <Img src={props.imagePath} alt={props.makerName} title={props.makerName} />
      </div>
      <div className="featured-artist col-xs-12 col-sm-6">
        <p className="eye-brow">Featured</p>
        <h3 className="name">{props.makerName}</h3>
        <p className="nat-birth">{calcNatBirthDisplay(props)}</p>
        {props.env === 'web'
          ? <FollowArtist makerId={props.makerId} />
          : null
        }
        <span className="bio" dangerouslySetInnerHTML={{ __html: desc }} />
        <a className="read-more" href={url}>View Profile</a>
      </div>
    </div>
  );
  return html;
};

export default Featured;
