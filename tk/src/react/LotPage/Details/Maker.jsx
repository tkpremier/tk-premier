import React from 'react';
import FollowArtist from '../../FollowArtist/FollowArtist';
import { makerPropTypes } from '../../PropTypes/proptypes';
import uriEncoder from '../../../utils/uriencoder';

const ArtistInfo = ({ artistNationality, artistBirthYear, artistDeathYear }) => {
  const birthYear = artistBirthYear ? `• ${artistBirthYear}` : null;
  const deathYear = artistDeathYear ? `- ${artistDeathYear}` : null;
  return (<p className="artist-info">{artistNationality} {birthYear} {deathYear}</p>);
};

ArtistInfo.propTypes = makerPropTypes;

const ArtistBio = (props) => {
  const header = (props.department === 'Jewelry' || props.department === 'Watches')
    ? 'Maker'
    : 'Artist';
  const hasInfo = props.artistNationality.length > 0 || props.artistBirthYear.length > 0 || props.artistDeathYear.length > 0;
  console.log('bio: ', props.artistBiography);
  return (
    <li className="lot-page__details__list__item lot-page__details__list__item--artist-bio">
      <h4 className="lot-page__details__list__item__header">{`${header} Bio`}</h4>
      <a href={`/artist/${props.makerId}/${uriEncoder(props.makerName)}`} alt={`Go to ${props.makerName}'s page`}>
        <h4 className="lot-page__details__list__item__header lot-page__details__list__item__header--maker-name">{props.makerNameTranslated}</h4>
      </a>
      {hasInfo
        ? (
          <ArtistInfo
            artistNationality={props.artistNationality}
            artistBirthYear={props.artistBirthYear}
            artistDeathYear={props.artistDeathYear}
          />
        )
        : null
      }
      <FollowArtist makerId={props.makerId} makerName={props.makerName} />
      <div
        className="artist-bio"
        dangerouslySetInnerHTML={{ __html: props.artistBiography }}
      />
      <a href={`/artist/${props.makerId}/${uriEncoder(props.makerName)}`}>
        <div className="lot-essay-button artist">
          <em>View More Works</em>
        </div>
      </a>
    </li>
  );
};

ArtistBio.defaultProps = {
  artistBirthYear: '',
  artistDeathYear: '',
  artistNationality: ''
};

ArtistBio.propTypes = makerPropTypes;

export default ArtistBio;
