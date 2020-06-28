import React from 'react';
import classNames from 'classnames';
import isNull from 'lodash/isNull';
import MyArtistsLinkContainer from './MyArtistsLink.container';
import MakerBio from './MakerBio';
import ArtistGrid from './ArtistGrid';
import FollowArtist from '../FollowArtist/FollowArtist';
import Headlines from '../Articker/Headlines';
import { defaultArtistLanding, artistLandingPropTypes } from './proptypes';

const calcNatBirthDisplay = ({ birthYear, deathYear, makerBio, nationality }) => {
  let makerNatBirth = '';
  if (!isNull(nationality) && nationality.length > 0) {
    makerNatBirth = nationality;
  }
  if (
    !isNull(birthYear)
    && birthYear !== 'N/A'
    && birthYear.length > 0) {
    if (!isNull(nationality) && nationality.length > 0) {
      makerNatBirth = `${makerNatBirth}&nbsp;&nbsp;&bull;&nbsp;&nbsp;`;
    }
    if (!isNull(deathYear)
      && deathYear !== 'N/A'
      && deathYear.length > 0) {
      return `${makerNatBirth}${birthYear}-${deathYear}`;
    }
    if (!isNull(birthYear) && birthYear !== 'N/A') {
      return `${makerNatBirth}b. ${birthYear}`;
    }
  }
  return makerNatBirth;
};

const ArtistLandingPage = ({
  apiRoot,
  biography,
  birthYear,
  deathYear,
  firstQuote,
  headlines,
  insights,
  isConsignmentMaker,
  makerId,
  makerName,
  nationality,
  pastLots,
  upcomingLots
}) => {
  const makerBio = { biography, headlines, firstQuote, insights };
  const hasBio = Object.keys(makerBio).reduce((key, bool) => bool || !isNull(makerBio[key]), false);
  const makerClassName = classNames('col-xs-12 new-phillips-social', {
    'col-sm-7 col-sm-pull-5': isConsignmentMaker,
    'centered': !isConsignmentMaker,
    'new-phillips-social--margin-bottom-80': !hasBio
  });
  return (
    <div className="main-container">
      <div className="content-area container" id="phillips-grid">
        <MyArtistsLinkContainer />
        {isConsignmentMaker
          ? (
            <div className={classNames('sell-consignment col-xs-12 col-sm-5 col-sm-push-7', { 'sell-consignment--margin-bottom-80': !hasBio })}>
              <div className="row">
                <div className="col-xs-12">
                  <h3>Sell with us.</h3>
                </div>
              </div>
              <div className="row">
                <div className="horizontal-copy col-md-6 col-xs-12">
                  <p>{`We are inviting consignment submissions for ${makerName}.`}</p>
                </div>
                <div className="horizontal-layout col-md-6 col-xs-12">
                  <a href={`/sell?maker-id=${makerId}&maker-name=${makerName}`}>Submit Now</a>
                </div>
              </div>
            </div>
          )
          : null
        }
        <div className={makerClassName}>
          <h1>{makerName}</h1>
          <FollowArtist
            makerId={makerId}
            makerName={makerName}
          />
          {hasBio
            ? (
              <p
                className="col-xs-12"
                dangerouslySetInnerHTML={{ __html: calcNatBirthDisplay({ birthYear, deathYear, makerBio, nationality }) }}
                id="nat-birth"
              />
            )
            : null
          }
        </div>
        {hasBio
          ? <MakerBio {...makerBio} />
          : null
        }
        {headlines.length > 0
          ? (
            <React.Fragment>
              <h3>{`Recent ${makerName} headlines, Powered by Articker`}</h3>
              <Headlines headlines={headlines} />
            </React.Fragment>
          )
          : null
        }
        <section className="artist-grid row">
          {!isNull(upcomingLots.data) && upcomingLots.data.length > 0
            ? (
              <React.Fragment>
                <h3>Upcoming Lots</h3>
                <ArtistGrid
                  apiRoot={apiRoot}
                  makerId={makerId}
                  status="upcoming"
                  {...upcomingLots}
                />
              </React.Fragment>
            )
            : null
          }
          {!isNull(pastLots.data) && pastLots.data.length > 0
            ? (
              <React.Fragment>
                <h3>Past Lots</h3>
                <ArtistGrid
                  apiRoot={apiRoot}
                  status="past"
                  makerId={makerId}
                  {...pastLots}
                />
              </React.Fragment>
            )
            : null
          }
        </section>
      </div>
    </div>
  );
};

ArtistLandingPage.defaultProps = defaultArtistLanding;
ArtistLandingPage.propTypes = artistLandingPropTypes;

export default ArtistLandingPage;
