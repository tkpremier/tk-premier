import React, { Fragment } from 'react';
import { lotDescPropTypes } from '../../PropTypes/proptypes';
import setLineBreaks from '../../utils/setLineBreaks';

export const JewelsDetails = props => (
  <li>
    <ul className="bullet-list">
      {props.jPrincipalStone ? <li><p dangerouslySetInnerHTML={{ __html: setLineBreaks(props.jPrincipalStone) }} /></li> : null}
      {props.jSide ? <li><p dangerouslySetInnerHTML={{ __html: setLineBreaks(props.jSide) }} /></li> : null}
      {props.jMetal ? <li><p dangerouslySetInnerHTML={{ __html: setLineBreaks(props.jMetal) }} /></li> : null}
      {props.jAssayMarks ? <li><p dangerouslySetInnerHTML={{ __html: setLineBreaks(props.jAssayMarks) }} /></li> : null}
      {props.jRemark ? <li><p dangerouslySetInnerHTML={{ __html: setLineBreaks(props.jRemark) }} /></li> : null}
      {props.jYear ? <li><p dangerouslySetInnerHTML={{ __html: setLineBreaks(props.jYear) }} /></li> : null}
      {props.circa ? <li><p dangerouslySetInnerHTML={{ __html: setLineBreaks(props.circa) }} /></li> : null}
      {props.artistInscription ? <li><p dangerouslySetInnerHTML={{ __html: setLineBreaks(props.artistInscription) }} /></li> : null}
      {props.medium ? <li><p dangerouslySetInnerHTML={{ __html: setLineBreaks(props.medium) }} /></li> : null}
      {props.dimensions ? <li><p dangerouslySetInnerHTML={{ __html: setLineBreaks(props.dimensions) }} /></li> : null}
      {props.sigEdtMan ? <li><p dangerouslySetInnerHTML={{ __html: setLineBreaks(props.sigEdtMan) }} /></li> : null}
    </ul>
    {props.jReport
      ? (
        <Fragment>
          <p dangerouslySetInnerHTML={{ __html: setLineBreaks(props.jReport) }} />
          {props.cjReport
            ? (
              <span className="hong-kong">
                <p dangerouslySetInnerHTML={{ __html: setLineBreaks(props.cjReport) }} />
              </span>
            )
            : null
          }
        </Fragment>
      )
      : null
    }
    {props.jAccessories ? <p dangerouslySetInnerHTML={{ __html: setLineBreaks(props.jAccessories) }} /> : null}
  </li>
);

JewelsDetails.propTypes = lotDescPropTypes;

const WatchDetailItem = ({ header, value }) => (
  <span>
    <strong className="section-header">{header}:</strong>
    <text dangerouslySetInnerHTML={{ __html: ` ${setLineBreaks(value)}` }} />
    <br />
  </span>
);
WatchDetailItem.propTypes = lotDescPropTypes;

export const WatchDetails = props => (
  <li>
    <p>
      {props.makerName ? <WatchDetailItem header="Manufacturer" value={props.makerName} /> : null}
      {props.circa ? <WatchDetailItem header="Year" value={props.circa} /> : null}
      {props.wReferenceNo ? <WatchDetailItem header="Reference No" value={props.wReferenceNo} /> : null}
      {props.wMovementNo ? <WatchDetailItem header="Movement No" value={props.wMovementNo} /> : null}
      {props.wCaseNo ? <WatchDetailItem header="Case No" value={props.wCaseNo} /> : null}
      {props.wModelName ? <WatchDetailItem header="Model Name" value={props.wModelName} /> : null}
      {props.wMaterial ? <WatchDetailItem header="Material" value={props.wMaterial} /> : null}
      {props.wCalibre ? <WatchDetailItem header="Calibre" value={props.wCalibre} /> : null}
      {props.wBracelet_Strap ? <WatchDetailItem header="Bracelet/Strap" value={props.wBracelet_Strap} /> : null}
      {props.wClasp_Buckle ? <WatchDetailItem header="Clasp/Buckle" value={props.wClasp_Buckle} /> : null}
      {props.dimensions ? <WatchDetailItem header="Dimensions" value={props.dimensions} /> : null}
      {props.sigEdtMan ? <WatchDetailItem header="Signed" value={props.sigEdtMan} /> : null}
      {props.wAccessories ? <WatchDetailItem header="Accessories" value={props.wAccessories} /> : null}
      {props.provenance ? <WatchDetailItem header="Provenance" value={props.provenance} /> : null}
      {props.literature ? <WatchDetailItem header="Literature" value={props.literature} /> : null}
    </p>
  </li>
);
WatchDetails.propTypes = lotDescPropTypes;
