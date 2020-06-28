import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import format from 'date-fns/format';
import formatISO from 'date-fns/formatISO';
import addHours from 'date-fns/addHours';
import initializeAddToCalendar from './initializeAddToCalendar';

const getAuctionDate = (auctionDate) => {
  return new Date(auctionDate).toUTCString();
};

class CalendarLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'mounting'
    };
  }

  componentDidMount() {
    initializeAddToCalendar()
      .then(() => this.setState(state => ({ ...state, status: 'connected' })))
      .catch(() => this.setState(state => ({ ...state, status: 'error' })));
  }

  render() {
    const startDateUTC = getAuctionDate(this.props.startDateTime);
    const startDateTime = moment(startDateUTC);
    const endDateTime = this.props.endDateTime
      ? moment(getAuctionDate(this.props.endDateTime))
      : moment(getAuctionDate(this.props.startDateTime)).add(1, 'hour');
    const className = classNames({ 'hidden': (this.state.status === 'mounting' || this.state.status === 'error') });
    return (
      <div id="add-to-calendar" className={className}>
        <span className="addtocalendar atc-style-icon atc-style-menu-wb">
          <a className="atcb-link">
            <img
              src="/images/Add-to_cal.svg"
              className="icon"
              alt="Add To Calendar"
              title="Add To Calendar"
            />
            Add To Calendar
          </a>
          <var className="atc_event">
            <var className="atc_date_start">
              {startDateTime.format('YYYY-MM-DD HH:mm:ss')}
            </var>
            <var className="atc_date_end">
              {endDateTime.format('YYYY-MM-DD HH:mm:ss')}
            </var>
            <var className="atc_timezone">{this.props.timeZone}</var>
            <var className="atc_title">{this.props.title}</var>
            <var className="atc_description">{this.props.description}</var>
            <var className="atc_location">{this.props.location}</var>
            <var className="atc_organizer">{this.props.organizer}</var>
            <var className="atc_organizer_email">{this.props.organizerEmail}</var>
          </var>
        </span>
      </div>
    )
  }
};

CalendarLink.defaultProps = {
  startDateTime: '',
  endDateTime: false,
  timeZone: 'America/New_York',
  title: '',
  description: '',
  location: '',
  organizer: 'Phillips',
  organizerEmail: 'info@phillips.com'
};

CalendarLink.propTypes = {
  startDateTime: PropTypes.string,
  endDateTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  timeZone: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  organizer: PropTypes.string,
  organizerEmail: PropTypes.string
};

export default CalendarLink;
