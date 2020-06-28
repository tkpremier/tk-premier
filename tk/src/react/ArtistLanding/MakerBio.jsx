import React, { createRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import isNull from 'lodash/isNull';
import handleMql from '../../utils/handlemql';
import { defaultMakerBio, makerBioPropTypes } from './proptypes';

const MakerBio = ({ biography, firstQuote, insights }) => {
  const ref = createRef(null);
  const [readMore, setReadMore] = useState(false);
  const noInsightsAndQuotes = (isNull(insights) || insights.length === 0) && (isNull(firstQuote) || firstQuote.length === 0);
  useEffect(() => {
    handleMql('(min-width: 480px)', (mql) => {
      if (mql.matches) {
        if (ref.current.offsetHeight > 375) {
          setReadMore(true);
        }
      } else {
        setReadMore(true);
      }
    });
  }, []);
  return (
    <div
      className={classNames('row', { 'read-more': readMore })}
      id="maker-bio"
      ref={ref}
    >
      {!isNull(biography) && biography !== ''
        ? (
          <div className={classNames('col-xs-12 biography', {
            'col-sm-6': !noInsightsAndQuotes,
            'solo': noInsightsAndQuotes
          })}
          >
            <h3>Biography</h3>
            <span
              dangerouslySetInnerHTML={{ __html: biography }}
            />
          </div>
        )
        : null
      }
      {!isNull(insights) && insights.length > 0
        ? (
          <div className="col-xs-12 col-sm-6 insights">
            <h3>Insights</h3>
            <ul className="insights">
              {insights.map(insight => (
                <li
                  dangerouslySetInnerHTML={{ __html: insight }}
                />
              ))}
            </ul>
          </div>
        )
        : null
      }
      {firstQuote !== ''
        ? (
          <div
            className={classNames('col-xs-12 quote', { 'col-sm-6': isNull(insights) })}
            dangerouslySetInnerHTML={{ __html: firstQuote }}
          />
        )
        : null
      }
      <div className="read-more-overlay" />
      <button
        type="button"
        onClick={() => setReadMore(false)}
        className="read-more-button"
      >
        Read More
      </button>
    </div>
  );
};

MakerBio.defaultProps = defaultMakerBio;
MakerBio.propTypes = makerBioPropTypes;

export default MakerBio;