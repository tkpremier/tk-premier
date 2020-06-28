import React, { createElement, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isArray, replace } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ConsignmentForm from './ConsignmentForm';
import HeroBanner from '../HeroBanner/HeroBanner';
import content from './content.json';
import faq from './faq.json';
import { seroBold, seroWebPro } from '../styles/js/fonts';

const borderTop = {
  borderTop: '1px solid #000'
};

const borderBottom = {
  borderBottom: '1px solid #000'
};
const link = {
  ...seroWebPro,
  textDecoration: 'underline'
};
const styles = {
  expansionPanelDetails: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start'
  },
  wrapper: {
    ...borderTop
  },
  root: {
    ...borderBottom,
    borderRadius: 0,
    boxShadow: 'none'
  },
  link,
  seroBold,
  seroWebPro
};
const Answer = ({ answer, className }) => answer.map((el) => {
  const key = Object.keys(el)[0];
  const value = el[key];
  const props = { className };
  if (el.setInnerHtml) {
    props.dangerouslySetInnerHTML = {
      __html: value
    };
  }
  return createElement(
    key,
    props,
    el.setInnerHtml
      ? null
      : isArray(value)
        ? <Answer answer={value} className={`${className}`} />
        : value
  );
});

const ExpandableHOC = ({ classes, language }) => {
  const { expansionPanelDetails, root, seroBold, seroWebPro, wrapper } = classes;
  const faqContent = faq[language];
  return (
    <div className={`sell-page__faq ${wrapper}`}>
      {faqContent.map(question => (
        <ExpansionPanel classes={{ root }} square>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <p className={seroBold}>
              {question.q}
            </p>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails classes={{ root: expansionPanelDetails }}>
            <Answer answer={question.a} className={seroWebPro} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
};
export const Expandable = withStyles(styles)(ExpandableHOC);

const SellPage = ({ apiUrl = '', language = '', mediums = [], countries = [] }) => {
  const { contactInfo, landingCopy, headline } = content[language];
  const isChinese = language.toUpperCase() === 'CH';
  return (
    <div className="sell-page">
      <HeroBanner
        image="https://assets.phillips.com/image/upload/t_Website_HeroBanner/v1/website/careers_banner_01.jpg"
        headline={headline}
      />
      <div className="main-container">
        <div className="container content-area">
          <div className="left-column col-xs-12 col-md-8 landing-copy">
            <h2>{landingCopy.submitConsignmentHeader}</h2>
            <ul className="images-copy">
              {landingCopy.submitConsignment.map(item => (
                <li className="images-copy__item">
                  <img className="images-copy__item__image" src={item.imgSrc} alt={item.h3} />
                  <h3 className="images-copy__item__h3">{item.h3}</h3>
                  <p className="images-copy__item__p">{item.p}</p>
                </li>
              ))}
            </ul>
            <a href="#consignment-form-a" className="goto-form hide-tablet">Go to Form</a>
            <h2>{landingCopy.howItWorks}</h2>
            {landingCopy.howItWorksCopy.map(para => (
              <p>{para}</p>
            ))}
            <h2>{landingCopy.whyPhillips}</h2>
            {landingCopy.whyPhillipsCopy.map(para => (
              <p>{para}</p>
            ))}
            <h2>{isChinese ? '常見問題' : 'FAQs'}</h2>
            <Expandable language={isChinese ? 'ch' : 'en'} />
          </div>
          <div className="hide-tablet consignment-form-a" id="consignment-form-a" />
          <div className="right-column col-xs-12 col-md-4">
            <ConsignmentForm
              apiUrl={apiUrl}
              countries={countries}
              mediums={mediums}
            />
            <div className="contact">
              <h3>{contactInfo.header}</h3>
              {contactInfo.locations.map(loc => (
                <p>
                  {loc.city}
                  <br />
                  <a href={`tel:${replace(loc.tel, ' ', '')}`}>{loc.tel}</a>
                  <br />
                  <a href={`mailto:${loc.email}`}>{loc.email}</a>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SellPage.propTypes = {
  mediums: PropTypes.arrayOf(PropTypes.objectOf({
    medium: PropTypes.string,
    mediumId: PropTypes.number
  })).isRequired,
  language: PropTypes.string,
  loggedIn: PropTypes.func.isRequired
};
export default SellPage;
